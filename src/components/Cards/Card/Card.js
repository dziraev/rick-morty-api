import styles from "./Card.module.scss"


const Card = ({ character, openModal }) => {

	const checkStatus = (status) => {
		if (status === 'Dead') {
			return styles.card__badgeDead
		} else if (status === 'Alive') {
			return styles.card__badgeAlive
		} else {
			return styles.card__badgeUnknown
		}
	}
	const { name, image,  status, id} = character;
	return (
		<div className={styles.card}>
			<div
				onClick={()=> { openModal(id) }}
				className={styles.card__item}>
				<div className={styles.card__picture}>
					<img src={image} alt="" className={styles.card__image}/>
				</div>
				<div className={styles.card__body}>
					<div className={styles.card__title}>{name}</div>
				</div>
			</div>
			<div className={checkStatus(status)}>{status}</div>
		</div>
	);
};

export default Card;