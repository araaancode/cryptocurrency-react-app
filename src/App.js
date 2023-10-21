// App.js

import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
	// Setting up the initial states using
	// react hook 'useState'
	const [search, setSearch] = useState("");
	const [crypto, setCrypto] = useState([]);

	// Fetching crypto data from the API only
	// once when the component is mounted
	useEffect(() => {
		Axios.get(
			`https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`
		).then((res) => {
			setCrypto(res.data.coins);
		});
	}, []);

	return (
		<div className="App">
      <img src="https://cdn-icons-png.flaticon.com/128/7400/7400222.png?ga=GA1.1.717267418.1690213421&track=ais" alt="crypto-app" />
			<input
				type="text"
				placeholder="...جستجو"
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
 		
		 <table dir="rtl">
            <thead>
                <tr>
                    <td>رتبه</td>
                    <td>نام</td>
                    <td>نماد</td>
                    <td>ارزش بازار</td>
                    <td>قیمت</td>
                    <td>عرضه موجود</td>
                    <td>حجم(24 ساعت گذشته)</td>
                </tr>
            </thead>
            {/* Mapping all the cryptos */}
            <tbody>
                {/* Filtering to check for the searched crypto */}
                {crypto
                    .filter((val) => {
                        return val.name.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((val, id) => {
                        return (
                            <>
                                <tr id={id}>
                                    <td className="rank">{val.rank}</td>
                                    <td className="logo">
                                        <a href={val.websiteUrl}>
                                            <img src={val.icon} alt="logo" width="30px" />
                                        </a>

                                        <p>{val.name}</p>

                                    </td>
                                    <td className="symbol">{val.symbol}</td>
                                    <td>{val.marketCap}</td>
                                    <td>{val.price.toFixed(2)}</td>
                                    <td>{val.availableSupply}</td>
                                    <td>{val.volume.toFixed(0)}</td>
                                </tr>
                            </>
                        );
                    })}
            </tbody>
        </table>
		
		</div>
	);
}

export default App;
