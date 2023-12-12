import './ExploreContainer.scss';
import Users from './Users';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
     <Users/>
    </div>
  );
};

export default ExploreContainer;
