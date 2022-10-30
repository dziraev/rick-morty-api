
import styles from "./Cards.module.scss"
import Card from "./Card/Card";

const Cards = ( {characters, openModal } ) => {
	return (
		<div className={styles.cards}>
			{characters.map(character => {
				return <Card key={character.id} character={character} openModal={openModal}  />
			})}
		</div>
	);
};

export default Cards;