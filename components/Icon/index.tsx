import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}

const Icon = ({ icon, style }) => {
  return <FontAwesomeIcon icon={icon} style={style} />;
};

export default Icon;
