import styles from "./Modal.module.scss";
import {AiFillCloseCircle} from "react-icons/ai";
import {useEffect, useState} from "react";
import Loader from "../Loader/Loader";

const Modal = ({ onClose, id }) => {
	const [fetchedData, updatedFetchedData] = useState([]);
	let { name, image, location, origin, gender, species, status, episode } = fetchedData;

	if (episode) {
		episode = episode[0].match(/episode\/(\d+)/)[1];
	}

	const API_URL  = `https://rickandmortyapi.com/api/character/${id}`

	const checkStatus = (status) => {
		if (status === 'Dead') {
			return styles.modal__badgeDead
		} else if (status === 'Alive') {
			return styles.modal__badgeAlive
		} else {
			return styles.modal__badgeUnknown
		}
	}

	useEffect(() => {
		(async function(){
			const data = await fetch(API_URL).then(res => res.json())
			updatedFetchedData(data)
		})()
	}, [])

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return ()=> document.body.style.overflow = 'unset';
	}, []);


	return !name ? <Loader /> : (
		<div onClick={onClose} className={styles.modal}>
			<div onClick={(e) => e.stopPropagation()} className={styles.modal__container}>
				<div className={styles.modal__picture}><img src={image} className={styles.modal__image}/></div>
				<div className={checkStatus(status)}>Status: {status} <br/> First appeared: Е{episode}</div>
				<div className={styles.modal__body}>
					<div className={styles.modal__text}>Name:
						<span> {name}</span>
					</div>
					<div className={styles.modal__text}>Gender:
						<span> {gender}</span>
					</div>
					<div className={styles.modal__text}>Location:
						<span> {location.name}</span>
					</div>
					<div className={styles.modal__text}>Origin:
						<span> {origin.name}</span>
					</div>
					<div className={styles.modal__text}>Species:
						<span> {species}</span>
					</div>
				</div>
				<AiFillCloseCircle onClick={onClose} className={styles.modal__close} />
			</div>
		</div>
	);

};

export default Modal;