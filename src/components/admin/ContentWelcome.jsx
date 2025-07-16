const ContentWelcome = ({ user }) => {
  return (
    <div>
      <h1 className="text-3xl font-serif">{`Welcome, ${user?.name} 💘`}</h1>
    </div>
  );
};
export default ContentWelcome;
