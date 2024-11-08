import React, { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ==============================|| WalletList PAGE ||============================== //
const WalletListPage = () => {
  const [data, setData] = useState([]);
  const [filtered, setFilteredData] = useState([]);
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [push, setPush] = useState(0);

  function handleChangeKeyword(event) {
    const keyword = event.target.value.toLowerCase();
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].walletAddress !== undefined) {
        temp.push(data[i]);
      }
    }
    const filtered = temp.filter((item) => item.walletAddress.toLowerCase().includes(keyword));
    setFilteredData(filtered);
  }
  const handleChangeNewWalletAddress = (event) => {
    setNewWalletAddress(event.target.value);
  };
  const addNewWallet = async () => {
    const response = await axios.post('https://spin-service-master.onrender.com/api/wallet/addWalletAddress', {
      data: {
        walletAddress: newWalletAddress
      }
    });
    if (response.data === 'sucess') {
      toast('success', { hideProgressBar: false, autoClose: 2000, type: 'success' });
      setPush(push + 1);
    } else if (response.data === 'Already exist') {
      toast(response.data, { hideProgressBar: false, autoClose: 2000, type: 'error' });
    }
  };

  useEffect(() => {
    axios
      .get('https://spin-service-master.onrender.com/api/wallet')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [push]);

  return (
    <div className="w-screen">
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">New wallet Address</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-slate-400 rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeNewWalletAddress}
        ></input>
        <button className="rounded-full bg-gray-300 hover:bg-gray-500 ml-3" onClick={addNewWallet}>
          <div className="mx-[20px]">Add New Wallet</div>
        </button>
      </div>
      <div className="inline-flex w-full mb-5">
        <div className="flex w-[205px] items-center justify-center">
          <div className="text-[20px]">keyword</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-slate-400 rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeKeyword}
        ></input>
      </div>
      <div className="table text-[15px] w-full">
        {filtered.length != 0 && (
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-left">No</div>
              <div className="table-cell text-left">Address</div>
            </div>
          </div>
        )}

        <div className="table-row-group">
          {filtered.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{item.walletAddress}</div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WalletListPage;
