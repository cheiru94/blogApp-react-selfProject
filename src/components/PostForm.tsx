export default function PostForm() {
  return (
    <form action="/post" method="POST" className="form">
      <div className="form__block">
        <label htmlFor="title">タイトル</label>
        <input type="text" name="title" id="title" required />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input type="text" name="summary" id="summary" required />
      </div>
      <div className="form__block">
        <label htmlFor="content">内容</label>
        <textarea name="content" id="content" required />
      </div>
      <div className="form__block">
        <input type="submit" value="提出" className="form__btn--submit" />
      </div>
    </form>
  );
}
