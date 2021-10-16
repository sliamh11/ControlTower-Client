import "./Icon.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = (props: any) => {
    return (
        <div className="Icon">
            <FontAwesomeIcon icon={props.i} />
        </div>
    )
}

export default Icon;