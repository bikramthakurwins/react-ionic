interface ContainerProps {
  name: string;
}

export const Home: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      {/* <Users/> */}
    </div>
  );
};
