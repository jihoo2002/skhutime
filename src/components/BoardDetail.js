import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './BoardDetail.scss';

const posts = [
  {
    id: 1,
    title: '저 좀 도와주세요 ㅜㅜ',
    content: ' 자바 때문에 미치겠어요 ㅜㅜ',
    author: '익명1',
    date: '2024-09-12',
  },
  {
    id: 2,
    title: '두 번째 게시물',
    content: ' 두 번째 게시물',
    author: '사용자2',
    date: '2024-09-11',
  },
  {
    id: 3,
    title: '세 번째 게시물',
    content: '세 번째 게시물',
    author: '사용자3',
    date: '2024-09-10',
  },
];

const BoardDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용
  const post = posts.find((post) => post.id === Number(id)); // 해당 id의 게시물 찾기

  // 댓글 목록과 새 댓글 상태 관리
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterCount, setCommenterCount] = useState(1); // 익명 작성자의 숫자 관리

  // 좋아요 상태 관리
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // 댓글 작성 처리 함수
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return; // 빈 댓글은 추가하지 않음

    const commentData = {
      id: comments.length + 1, // 고유 ID
      text: newComment,
      date: new Date().toISOString().slice(0, 10), // 현재 날짜
      author: `익명${commenterCount}`, // 작성자명 (익명1, 익명2, ...)
    };

    const updatedComments = [...comments, commentData];
    setComments(updatedComments); // 새 댓글 추가
    setNewComment(''); // 댓글 입력란 초기화
    setCommenterCount(commenterCount + 1); // 작성자 수 증가
  };

  // 좋아요 처리 함수 (한 번만 누를 수 있게 제한)
  const handleLike = () => {
    if (!hasLiked) {
      const updatedLikes = likes + 1;
      setLikes(updatedLikes);
      setHasLiked(true);
    }
  };

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  // 목록으로 돌아가기 버튼 클릭 시 페이지 이동
  const handleBackClick = (e) => {
    e.stopPropagation();
    navigate('/boardList'); // '/board' 경로로 이동
  };

  return (
    <div className="board-detail">
      <h1>{post.title}</h1>
      <div className="post-info">
        <p><strong>작성자:</strong> {post.author}</p>
        <p><strong>작성일:</strong> {post.date}</p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* 좋아요 섹션 */}
      <div className="like-section">
        <button 
          onClick={(e) => {
            e.stopPropagation(); // 부모로의 이벤트 전파를 막음
            handleLike(); // 좋아요 로직 실행
          }} 
          className="like-button" 
          disabled={hasLiked}
        >
          좋아요
        </button>
        <span>  {likes}</span> {/* 좋아요 수만 표시 */}
      </div>

      {/*댓글 목록*/}
      <div className="comments-section" onClick={(e) => e.stopPropagation()}>
        <h3>댓글</h3>
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id}>
                <p><strong>{comment.author}</strong>: {comment.text}</p>
                <span className="comment-date">{comment.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/*댓글 작성 폼*/}
      <form className="comment-form" onSubmit={handleCommentSubmit} onClick={(e) => e.stopPropagation()}>
        <textarea
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">댓글 작성</button>
      </form>

      {/* 목록으로 돌아가기 버튼 */}
      <button className="back-link" onClick={handleBackClick}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default BoardDetail;
