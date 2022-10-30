import {useEffect, useState} from "react";
import Cards from "../Cards/Cards";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import styles from "./Home.module.scss"
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Switcher from "../Switcher/Switcher";
import Paginate from "../Pagination/Paginate";



const Home = () => {
	const [openModal, setOpenModal]   = useState(false);
	const [id, setId]                 = useState();
	const [toggle, setToggle]         = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [data, setData]             = useState([]);
	const [fetching, setFetching]     = useState(true);
	const API_URL                     = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
	const {info, results = []}        = data;

	const onClickToggleHandler = () => {
		if (toggle ) {
			setData([])
			setFetching(true)
		}
		setPageNumber(1)
		setToggle(!toggle)

	}

	useEffect(() => {
		if (toggle === true) {
			(async function () {
				await fetch(API_URL)
					.then(res => res.json())
					.then(res => {
						setData(res);
					})
			})()
		}
	}, [API_URL, toggle])

	useEffect(() => {
		if (fetching && toggle === false) {
			(async function () {
				await fetch(API_URL)
					.then(res => res.json())
					.then(res => {
						setData({...res, results: [...results, ...res.results]});
						setPageNumber(prevNumber => prevNumber + 1)
					})
					.finally(() => setFetching(false))
			})()
		}

	}, [fetching])

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	})
	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight -
		    (e.target.documentElement.scrollTop + window.innerHeight) < 100 && pageNumber <= info.pages && !toggle) {
			setFetching(true)
		}
	}
	return (
		<>
			<div className="_container">
				<h1 className={styles.title}>Rick & Morty API</h1>
				<Switcher
					toggle={toggle}
					setPageNumber={setPageNumber}
					onSwitcher={onClickToggleHandler}
				/>

				{toggle && <Paginate
					info={info}
					pageNumber={pageNumber}
					setPageNumber={setPageNumber}
				/>}

				{info ? <Cards characters={results} openModal={(id) => {
						setId(id);
						setOpenModal(true)
					}}/>
					: <Loader/>}


			</div>
			{openModal && <Modal onClose={() => setOpenModal(false)} id={id}/>}
			<ScrollToTop/>
		</>
	);
};

export default Home;