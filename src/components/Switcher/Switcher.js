import styles from "./Switcher.module.scss"

const Switcher = ({ toggle, onSwitcher}) => {

	return (
		<form className={styles.form}>
			<div className={styles.switcher}>
				<label htmlFor="switcher" className={styles.switcher__label_fs}>Pagination</label>
				<div>
					<input id="switcher"
					       checked={toggle}
					       type="checkbox"
					       name="switcher"
					       className={styles.switcher__input}
					       onChange={() => {
					            onSwitcher();
						   }}
					/>
					<label htmlFor="switcher" className={styles.switcher__label}></label></div>
			</div>
		</form>
	);
};

export default Switcher;