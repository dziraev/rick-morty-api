import {Pagination} from "@mui/material";
import {useEffect, useState} from "react";



const Paginate = ({ info, pageNumber, setPageNumber }) => {

	const [width, setWidth] = useState(window.innerWidth);

	const updateDimension = () => {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", updateDimension)
		return () => window.removeEventListener("resize", updateDimension)
	}, [])

	return (
		<Pagination
			count={info?.pages}
			variant="outlined"
			color="error"
			page={pageNumber}
			showFirstButton={width > 767}
			showLastButton={width > 767}
			onChange={(_, page) => setPageNumber(page)}
			sx={{
				display:'flex',
				justifyContent: 'center',
				marginY: 2
			}}

		/>
	);
};

export default Paginate;