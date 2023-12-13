import './explore.scss';
import {Users} from '../../pages';

interface ContainerProps {
  name: string;
}

export const Explore: React.FC<ContainerProps> = ({ name }) => {
  return (
    <>
     <Users/>
    </>
  );
};
