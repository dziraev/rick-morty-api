import styles from "./ScrollToTop.module.scss"
import { BiArrowFromBottom } from "react-icons/bi";
import {useEffect, useState} from "react";
import smoothscroll from "smoothscroll-polyfill"


const ScrollToTop = () => {
	smoothscroll.polyfill();
	const [isVisible, setIsVisible] = useState(false);
	const [show, setShow] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility)

	}, [])
	return (
		<div className={isVisible ? `${styles.wrapper} ${styles.wrapper__show}` : styles.wrapper }>
			<button
				type="button"
				onClick={scrollToTop}
				onTouchStart={()=> setShow(true)}
				onTouchEnd={()=> setShow(false)}
				className={show ? `${styles.button__show} ${styles.button}` : styles.button}>
				<BiArrowFromBottom className={styles.arrow}/>
			</button>
		</div>
	)
	;
};

export default ScrollToTop;