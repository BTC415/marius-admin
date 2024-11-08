import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { CSVLink } from 'react-csv';
// ==============================|| WalletList PAGE ||============================== //
const AirdopPage = () => {
  const [randomCode, setRandomCode] = useState('');
  const [tokenNum, setTokenNum] = useState(0);
  const [userNum, setUserNum] = useState(0);
  const [comunity, setComunityName] = useState('');
  const [data, setData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [maximumNum, setMaximumNum] = useState(0);
  const [deadline, setDeadLine] = useState('');
  const generateCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomCode(result);
  };

  const handleDeadLine = async (newValue) => {
    setDeadLine(newValue.target.value);
  };
  const createCode = async () => {
    if (tokenNum === 0 || userNum === 0 || comunity === '' || randomCode === '' || deadline === '' || maximumNum === 0) {
      toast('Please input all data', { hideProgressBar: false, autoClose: 2000, type: 'error' });
    } else {
      const response = await axios.post('https://marius-server-wjua.onrender.com/api/airdrop/create', {
        tokenNum: tokenNum,
        userNum: userNum,
        comunity: comunity,
        randomCode: randomCode,
        deadline: deadline,
        maximumNum: maximumNum
      });
      // const response = await axios.post('https://marius-server-wjua.onrender.com/api/airdrop/create', {
      //   tokenNum: tokenNum,
      //   userNum: userNum,
      //   comunity: comunity,
      //   randomCode: randomCode,
      //   deadline: deadline,
      //   maximumNum: maximumNum
      // });
      if (response.data.status === 'success') {
        toast('success', { hideProgressBar: false, autoClose: 2000, type: 'success' });
        setData(response.data.data);
      }
    }
  };
  const getAirdrop = async () => {
    axios
      .get('https://marius-server-wjua.onrender.com/api/airdrop')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTransaction = async () => {
    axios
      .get('https://marius-server-wjua.onrender.com/api/airdrop/transaction')
      .then((response) => {
        setTransactionData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCloseCode = async (id) => {
    const response = await axios.post('https://marius-server-wjua.onrender.com/api/airdrop/closeCode', {
      id: id
    });
    if (response.data === 'success') {
      toast('success', { hideProgressBar: false, autoClose: 2000, type: 'success' });
    }
  };
  useEffect(() => {
    getAirdrop();
    getTransaction();
  }, []);

  return (
    <div className="w-screen">
      <div className="text-[23px] mb-3">Create code</div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Token number available for purchase</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setTokenNum(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Users number available for purchase</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setUserNum(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[210px]">
          <div className="text-[20px]">Comunity Name</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setComunityName(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[160px]">
          <div className="text-[20px]">Maximun buy number</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setMaximumNum(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-[30px]">
        <input
          disabled={true}
          value={randomCode}
          className="items-center w-[346px] text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:text-black bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
        ></input>
        <button className="rounded-full bg-gray-300 hover:bg-gray-500 ml-[30px]" onClick={generateCode}>
          <div className="mx-[20px]">Generate Code</div>
        </button>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Deadline</div>
        </div>
        <TextField
          id="datetime-local"
          placeholder="Next Appointment"
          type="datetime-local"
          defaultValue="2023-09-02T00:00"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(newValue) => handleDeadLine(newValue)}
        />
        <button className="rounded-full bg-gray-300 hover:bg-gray-500 ml-[30px]" onClick={createCode}>
          <div className="mx-[20px]">Create Code</div>
        </button>
      </div>
      <div className="text-[23px] mb-3">Code List</div>
      <div className="table text-[15px] w-full">
        {data.length != 0 && (
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-left">No</div>
              <div className="table-cell text-left">Comunity</div>
              <div className="table-cell text-left">Deadline</div>
              <div className="table-cell text-left">Tokens</div>
              <div className="table-cell text-left">Users</div>
              <div className="table-cell text-left">RandomCode</div>
              <div className="table-cell text-left">Maximun Num</div>
              <div className="table-cell text-left">Code Status</div>
              <div className="table-cell text-left">Close Code</div>
            </div>
          </div>
        )}
        <div className="table-row-group">
          {data.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{item.comunity}</div>
              <div className="table-cell">{item.deadline}</div>
              <div className="table-cell">{item.tokenNum}</div>
              <div className="table-cell">{item.userNum}</div>
              <div className="table-cell">{item.randomCode}</div>
              <div className="table-cell">{item.maximumNum}</div>
              <div className="table-cell">{item.closeStatus === false ? <>false</> : <>true</>}</div>
              <div className="table-cell p-2 mb-1">
                <button
                  className="rounded-lg bg-gray-500 p-1"
                  onClick={() => {
                    handleCloseCode(item.id);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="inline-flex mt-8 mb-3 items-center">
        <div className="text-[23px] mr-[500px]">Transaction List</div>
        <CSVLink data={transactionData} filename={'my-file.csv'} target="_blank">
          <div className="text-[15px] bg-gray-300 hover:bg-gray-500 w-[150px] text-center rounded-full py-[10px]">Export to CSV</div>
        </CSVLink>
      </div>
      <div className="table text-[15px]">
        {transactionData.length != 0 && (
          <div className="table-header-group ">
            <div className="inline-flex">
              <div className="w-[30px] border border-black inline-flex items-center justify-center">No</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">Wallet</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">Transaction</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">Code</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">NFTNum</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">Chain</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">Value(sol)</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">Tokens</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">Transaction date</div>
            </div>
          </div>
        )}
        <div className="table-row-group">
          {transactionData.map((item, index) => (
            <div className="inline-flex" key={index}>
              <div className="w-[30px] border border-black">{index + 1}</div>
              <div className="w-[200px] overflow-y-auto border border-black">{item.publicKey}</div>
              <div className="w-[200px] overflow-y-auto border border-black">{item.transaction}</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">{item.code}</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">{item.nftNum}</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">{item.unit}</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">{item.value}</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">{item.tokens}</div>
              <div className="w-[200px] overflow-y-auto border border-black inline-flex items-center justify-center">{item.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AirdopPage;
