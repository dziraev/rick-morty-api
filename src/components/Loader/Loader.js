import {DotLoader} from "react-spinners";
import styles from "./Loader.module.scss"

const Loader = () => {
	return (
		<div className={styles.loader}>
			<DotLoader color="#dc3545" size={100} />
		</div>
	);
};

export default Loader;