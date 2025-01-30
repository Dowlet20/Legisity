"use client";
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import {useState, useEffect,} from 'react'
import { useMyContext } from '@/context/mycontext';
import {useRouter} from 'next/navigation';

const AdminPage = () => {

  const {isAuthenticated} = useMyContext();
  const router = useRouter();

  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  
  const [kodeks, setKodeks] = useState({
    "title_tm": "",
    "title_ru":""
  });
  const [response, setResponse] = useState({
      "kodeks":false,
      "nama":false,
      "perman":false,
      "dictionary":false,
      "information":false,
      "kodeksDelete":false,
      "namaDelete":false,
      "permanDelete":false,
      "dictionaryDelete":false,
      "informationDelete": false
    });

  const [error, setError] = useState('');
  const [nama, setNama] = useState(
    {
      "title_tm":"",
      "title_ru":"", 
      "kodeks_id":0
    });

  const [perman, setPerman] = useState(
      {
        "title_tm":"",
        "title_ru":"",
        "month":"",
        "month_ru":"",
        "year":0,
        "number":"", 
        "namalar_id":0
    }
  );

  const [dictionary, setDictionary] = useState(
    {
      "title_tm":"",
      "title_ru":"",
      "description_tm":"",
      "description_ru":"",
    }
  );

  const [information, setInformation] = useState(
    {
      "title_tm":"",
      "title_ru":"",
      "description_tm":"",
      "description_ru":"",
    }
  );

  const [kodeksler, setKodeksler] = useState([]);
  const [selectedNama, setSelectedNama] = useState(0);
  const [namalar, setNamalar] = useState([]);
  const [dictionaries, setDictionaries] = useState([]);
  const [informations, setInformations] = useState([]);
  const [permanlar, setPermanlar] = useState([]);
  const [selectedPerman, setSelectedPerman] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [file_rus, setFile_rus] = useState<File | null>(null);
  const [toggle, setToggle] = useState<string>("false");
  const [selectedDictionary, setSelectedDictionary] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(()=>{
    const fetchDictionary = async () => {
      const url = '/api/get-dictinary/';
      try {
        const response = await axiosInstance.get(url);
        setDictionaries(response.data);
        } 
        catch (err : any) {
          setError(`Error: ${err.message}`);
        }
      }
        fetchDictionary();
      },[response["dictionary"], response["dictionaryDelete"]]);


  useEffect(()=>{
    const fetchInformation = async () => {
      const url = '/api/get-information/';
      try {
        const response = await axiosInstance.get(url);
        setInformations(response.data);
        } 
        catch (err : any) {
          setError(`Error: ${err.message}`);
        }
      }
        fetchInformation();
      },[response["information"], response["informationDelete"]]);


  const handleFileChange = (event:any) => {
    if (event.target.files && event.target.files.length > 0) {  
      setFile(event.target.files[0]); 
  }
 };

  const handleFileChange_rus = (event:any) => {
    if (event.target.files && event.target.files.length > 0) {  
      setFile_rus(event.target.files[0]); 
  }
  };

    const kodeksPost = async (e: any) => {
        e.preventDefault();
        const url = '/api/create-kodeks/';
        const data = kodeks;
        try {
            if (kodeks.title_tm && kodeks.title_ru) {
                const response = await axiosInstance.post(url, data);
                setKodeks({
                  "title_tm":"",
                  "title_ru":""
                })
                setResponse(response => ({
                    ...response,
                    "kodeks" : true
        }));
        setTimeout(()=> {
            setResponse(response => ({
                ...response,
                "kodeks":false
              }));
              setError('');
            }, 1500);
          } else {
              return;
            }
          } catch (err:any) {
              setError(`Error: ${err.message}`);
            }
          }
        
    const namaPost = async (e: any) => {
        e.preventDefault();
        const url = '/api/create-namalar/';
        const data = nama;
        try {
          if (nama.title_tm && nama.title_tm && nama.kodeks_id) {
            const response = await axiosInstance.post(url, data);
            setNama((nama:any) => (
              {
                "title_tm":"",
                "title_ru":"", 
                "kodeks_id":nama?.kodeks_id
              }
              ));
            setResponse(response => ({
              ...response,
              "nama" : true
            }));
            setTimeout(()=> {
              setResponse(response => ({
                  ...response,
                  "nama":false
                }));
                setError('');
              }, 1500);
            } else {
         return;
      }
    } catch (err:any) {
        setError(`Error: ${err.message}`);
      } 
    }

    const uploadPDF = async (id: number): Promise<void> => {
    if (!file || !file_rus) {
        alert("Please upload a file first!");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_rus', file_rus);

    try {
        const response = await axiosInstance.put(`/api/update-pdf/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            setSuccessMessage("File uploaded successfully!");
            console.log("File uploaded successfully!");
            setFile(null); 
            setFile_rus(null);
          } else {
            setErrorMessage("Failed to upload the file.");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setErrorMessage(`Error: ${error.response.data.message || 'Upload failed.'}`);
          } else if (error.request) {
                setErrorMessage("No response from the server. Please try again later.");
              } else {
                setErrorMessage(`Error: ${error.message}`);
              }
            } else {
              setErrorMessage("An unexpected error occurred.");
            }
          }
        };
        
        const activePut = async (e: any) => {
          e.preventDefault();
          try {
            if (selectedPerman !== 0) {
              const url = `/api/update-active/${selectedPerman}?active=${toggle}`;
              await axiosInstance.put(url);
            } else {
              alert("Perman saýlaň");
            }
            e.target.reset();
          } catch (err:any) {
              setError(`Error: ${err.message}`);
          }
        }   

  const permanPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = '/api/create-perman/';
    const data = perman;

    if (!file) {
        alert("Please upload a file first!");
        return;
    }

    try {
        if (perman.title_tm && perman.title_ru && perman.month && perman.year && perman.number && perman.namalar_id && perman.month_ru) {
            const response = await axiosInstance.post(url, data);
            setPerman({
                title_tm: "",
                title_ru: "",
                month: "",
                month_ru:"",
                year: 0,
                number: "",
                namalar_id: perman?.namalar_id,
            });

            const id = response?.data.id;
            await uploadPDF(id);  
            await axiosInstance.put(`/api/update-active/${id}?active=${toggle}`);
            
            setResponse(response => ({
                ...response,
                perman: true
            }));
            //e.target.reset();
            setFile(null); 
            setFile_rus(null); 
            setError(''); 
            setSuccessMessage('');
            setTimeout(() => {
                setResponse(response => ({
                    ...response,
                    perman: false
                }));
                setError('');
            }, 1500);
        } else {
            return;
        }
      } catch (err: any) {
          setError(`Error: ${err.message}`);
      }
    };

    const dictionaryPost = async (e: any) => {
      e.preventDefault();
      const url = '/api/create-dictinary/';
      const data = dictionary;
      try {
        if (dictionary.title_tm && dictionary.title_ru && dictionary.description_tm && dictionary.description_ru) {
          const response = await axiosInstance.post(url, data);
          setDictionary({
            "title_tm":"",
            "title_ru":"",
            "description_tm":"",
            "description_ru":"",
          });
          setResponse(response => ({
              ...response,
              "dictionary" : true
          }));
          e.target.reset();
          setTimeout(()=> {
            setResponse(response => ({
                ...response,
                "dictionary":false
              }));
              setError('');
            }, 1500);
          } else {
              return;
            }
          } catch (err:any) {
              setError(`Error: ${err.message}`);
          }
        }   

  

        const informationPost = async (e: any) => {
          e.preventDefault();
          const url = '/api/create-informations/';
          const data = information;
          try {
            if (information.title_tm && information.title_ru && information.description_tm && information.description_ru) {
              const response = await axiosInstance.post(url, data);
              setInformation({
                "title_tm":"",
                "title_ru":"",
                "description_tm":"",
                "description_ru":"",
              });
              setResponse(response => ({
                  ...response,
                  "information" : true
              }));
              e.target.reset();
              setTimeout(()=> {
                setResponse(response => ({
                    ...response,
                    "information":false
                  }));
                  setError('');
                }, 1500);
              } else {
                  return;
                }
              } catch (err:any) {
                  setError(`Error: ${err.message}`);
              }
            } 

    useEffect(()=>{
        const fetchKodeks = async () => {
            const url = '/api/get-kodeks/';
            try {
                const response = await axiosInstance.get(url);
                setKodeksler(response.data);
              } catch (err : any) {
                  setError(`Error: ${err.message}`);
                }
              }
              fetchKodeks();
            },[response["kodeks"], response["kodeksDelete"]]);
          
          
    useEffect(() => {
        try {
            const getNamalar = async () => {
                const {data} = await axiosInstance.get(`/api/get-namalar?id=${nama?.["kodeks_id"]}`);
                setNamalar(data);
        
              }
              if (nama?.["kodeks_id"] && nama?.["kodeks_id"] !== 0) {
                  getNamalar();
          } 
          } catch (err) {
            console.log(err);
          }
          }, [nama?.["kodeks_id"], response["kodeksDelete"], response["nama"], response["namaDelete"]]);
  
          useEffect(() => {
            const getPermanlar = async () => {
                try {
                    const { data } = await axiosInstance.get(`/api/get-permanlar/${selectedNama}`);
                    setPermanlar(data);
                } catch (err) {
                    console.error(err);
                }
            };
    
            if (selectedNama > 0) {
                getPermanlar();
            }
        }, [selectedNama, response.permanDelete, response.perman]);
  
  
    const handleSelectChange = (event : any) => {
        const value = event.target.value;
        setNama((nama:any) => ({
            ...nama, 
            "kodeks_id": parseInt(value, 10) 
        })); 
        };

    const handleSelectDictionary = (event : any) => {
      const value = event.target.value;
      setSelectedDictionary(value);
      };

      const handleSelectInformation = (event : any) => {
        const value = event.target.value;
        setSelectedInfo(value);
        };
      
      
    const handleSelectCourse = (event:any) => {
        const value = event.target.value;
        setSelectedNama(parseInt(value,10));
        setPerman(perman=> ({
            ...perman,
            namalar_id: parseInt(value,10) 
          })); 
        };

        const handleSelectDay = (event:any) => {
          const value = event.target.value;
          setSelectedPerman(parseInt(value,10));
          };
          
         

    const handleDeleteWeek = async (itemId : number) => {
        try {

          const userConfirmed = window.confirm('Siz bellän elementiňizi pozmak isleýäňizmi ?');

            if (itemId) {
              if (userConfirmed) {
                const response = await axiosInstance.delete(`/api/delete-kodeks/${itemId}/`);

                setResponse(prevResponse => ({
                  ...prevResponse,
                  kodeksDelete: true
                }));
  
                  setTimeout(() => {
                    setResponse(prevResponse => ({
                          ...prevResponse,
                          kodeksDelete: false
                      }));
                      setError('');
                  }, 2000);
                  } else {
                      console.log('Cancelled');
                    }
                }
            } catch (error) {
                  console.error('Error deleting item:', error);
              }
        };


  const handleDeleteCourse = async (itemId:number) => {
    try {
        const userConfirmed = window.confirm('Siz bellän elementiňizi pozmak isleýäňizmi ?');
  
          if (itemId) {
            if (userConfirmed) {
                const response = await axiosInstance.delete(`/api/delete-namalar/${itemId}/`);
                setResponse(response => ({
                    ...response,
                    "namaDelete" : true
                  }));
                  setTimeout(()=> {
                      setResponse(response => ({
                          ...response,
                          "namaDelete":false
                        }));
                        setError('');
                      }, 2000);
                    } else {
                        console.log('Cancelled');
                      }
                    }
                  } catch (error:any) {
                      console.error('Error deleting item:', error);
                    }
                  };
                
            const handleDeleteDay = async (itemId:number) => {
              try {
                const userConfirmed = window.confirm('Siz bellän elementiňizi pozmak isleýäňizmi ?');
                if (itemId) {

                  if (userConfirmed) {
                    const response = await axiosInstance.delete(`/api/delete-permanlar/${itemId}/`);
                    setResponse(response => ({
                      ...response,
                      "permanDelete" : true
                    }));
                    setTimeout(()=> {
                        setResponse(response => ({
                            ...response,
                            "permanDelete":false
                          }));
                          setError('');
                        }, 2000);
                      } else {
                          console.log('Cancelled');
                        }
                      }
                    } catch (error) {
                        console.error('Error deleting item:', error);
                      }
                    };
      
      const handleDeleteDictionary = async (itemId : number) => {
        try {

          const userConfirmed = window.confirm('Siz bellän elementiňizi pozmak isleýäňizmi ?');

            if (itemId) {
              if (userConfirmed) {
                const response = await axiosInstance.delete(`/api/delete-dictinary/${itemId}/`);

                setResponse(prevResponse => ({
                  ...prevResponse,
                  dictionaryDelete: true
                }));
  
                  setTimeout(() => {
                    setResponse(prevResponse => ({
                          ...prevResponse,
                          dictionaryDelete: false
                      }));
                      setError('');
                  }, 2000);
                  
                  } else {
                      console.log('Cancelled');
                    }
                }
            } catch (error) {
                  console.error('Error deleting item:', error);
              }
        };


        const handleDeleteInformation = async (itemId : number) => {
          try {
  
            const userConfirmed = window.confirm('Siz bellän elementiňizi pozmak isleýäňizmi ?');
  
              if (itemId) {
                if (userConfirmed) {
                  const response = await axiosInstance.delete(`/api/delete-information/${itemId}/`);
  
                  setResponse(prevResponse => ({
                    ...prevResponse,
                    informationDelete: true
                  }));
    
                    setTimeout(() => {
                      setResponse(prevResponse => ({
                            ...prevResponse,
                            informationDelete: false
                        }));
                        setError('');
                    }, 2000);
                    
                    } else {
                        console.log('Cancelled');
                      }
                  }
              } catch (error) {
                    console.error('Error deleting item:', error);
                }
          };


      let msg = "";

      if (response.kodeks) {
          msg = "Täze kodeks goşuldy"
        }
      
      if (response.nama) {
          msg = "Täze nama goşuldy"
        }
      
      if (response.perman) {
          msg = "Täze perman goşuldy"
        }

        if (response.dictionary) {
          msg = "Täze soz goşuldy"
        }

        if (response.information) {
          msg = "Täze soz goşuldy"
        }
          
      if (response.kodeksDelete) {
          msg = "Bellän kodeksiniz pozuldy"
        }
      
      if (response.namaDelete) {
          msg = "Bellän namanyz pozuldy"
        }
      
      if (response.permanDelete) {
          msg = "Bellän permanynyz pozuldy"
        }

      if (response.dictionaryDelete) {
        msg = "Bellän soziniz pozuldy"
      }

      if (response.informationDelete) {
        msg = "Bellän maglumatynyz pozuldy"
      }


              
            
      
    return (
      <div className='flex flex-col text-gray-600 justify-center items-center mt-4'>
        <>
          {(response["kodeks"] || response["dictionary"] || 
          response["information"] || response["nama"] || response["perman"]) && <div className="text-green-600 text-[24px] font-semibold sticky top-[10px] right-[40px] z-100">
                  {msg}  
                </div>}
                {(response["kodeksDelete"] || response["informationDelete"] || response["dictionaryDelete"] || response["namaDelete"]|| response["permanDelete"]) && <div className="text-red-600 text-[24px] font-semibold sticky top-[10px] right-[10px] z-100">
                  {msg}  
                </div>}
                {error && <div className="text-red-600">
                  Ýalňyşlyk.  
                </div>}
            <div className='flex items-center justify-center w-[90%] 2xl:w-[50%] mb-[30px]'> 
              <select
                  value={nama?.kodeks_id}             
                  onChange={handleSelectChange}
                  className="self-center block p-2 border
                  border-gray-600 rounded-md focus:outline-none
                    focus:ring-2 w-1/4"
                >
                <option value="0">
                  Kodeks saýlaň
                </option>
                {
                  (Array.isArray(kodeksler) ? kodeksler : [])?.map((item:any, index) => {
                    return (
                      <option key={index} value={`${item?.id}`}>
                        {item["title_tm"]}
                      </option>
                    )
                  })
                }
              </select>


              <select
                value={selectedNama}             
                onChange={handleSelectCourse}
                className="self-center block p-2 border
                border-gray-600 rounded-md focus:outline-none
                  focus:ring-2 w-1/4 ml-[10px]"
              >
                  <option value="0">
                      Namany saýlaň
                  </option>
                {
                  (Array.isArray(namalar) ? namalar : [])?.map((nama:any, index) => {
                    return (
                      <option key={index} value={`${nama?.id}`}>
                        {nama.title_tm}
                      </option>
                    )
                  })
                  }
                </select>
                <select
                value={selectedPerman}             
                onChange={handleSelectDay}
                className="self-center block p-2 border
                border-gray-600 rounded-md focus:outline-none
                  focus:ring-2 w-1/4 ml-[10px]"
              >
                  <option value="0">
                    Permany saýlaň
                  </option>
                {
                  (Array.isArray(permanlar) ? permanlar : [])?.map((perman:any, index) => {
                    return (
                      <option key={index} value={`${perman?.id}`}>
                        {perman.title_tm}
                      </option>
                    )
                  })
                  }
                </select>


            </div>
            <div className='flex items-center justify-center w-[90%] xl:w-[50%] mb-[30px] gap-2'>
              <button 
                onClick={() => handleDeleteWeek(nama?.kodeks_id)}
                className='w-1/4 bg-red-500 text-[16px] font-semibold p-2 rounded-md text-gray-100'
              >
                Saýlanan kodeksini poz
              </button>
              <button 
                onClick={() => handleDeleteCourse(selectedNama)}
                className='w-1/4 bg-red-500 text-[16px] font-semibold p-2 rounded-md text-gray-100'
              >
                Saýlanan namany poz
              </button>
              <button 
                onClick={() => handleDeleteDay(selectedPerman)}
                className='w-1/4 bg-red-500 text-[16px] font-semibold p-2 rounded-md text-gray-100'
              >
                Saýlanan permany poz
              </button>
            </div>
            <div className='grid grid-cols-2 w-[90%] 2xl:w-[55%] gap-6'>
              <div className="w-[300px]  2xl:w-[400px] mx-auto p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold mb-3">
                  Täze kodeks goş...
                </h2>
                <form onSubmit={kodeksPost} className='flex flex-col'>
                  <input
                    value={kodeks?.title_tm}
                    type="text"
                    onChange={(e) => {
                      setKodeks(kodeks => ({
                        ...kodeks,
                        title_tm:e.target.value
                      }))
                    }}
                    placeholder="Täze türkmençe kodeks..."
                    className="block w-full p-2 mb-4 border rounded"
                  />
                  <input
                    value={kodeks?.title_ru}
                    type="text"
                    onChange={(e) => {
                      setKodeks(kodeks => ({
                        ...kodeks,
                        title_ru:e.target.value
                      }))
                    }}
                    placeholder="Täze orsça kodeks..."
                    className="block w-full p-2 mb-4 border rounded"
                  />
                  <button
                      type="submit"
                      className="p-1 bg-green-600 text-white rounded hover:bg-green-500 self-end w-[100px] font-semibold text-[18px]"
                  >
                      Goş
                  </button>
                </form>
              </div>
              <div className="w-[300px]  2xl:w-[400px] mx-auto p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold mb-3">
                  Täze nama goş...
                </h2>
                <form onSubmit={namaPost} className='flex flex-col'>
                  <div className='flex flex-col gap-4 items-center w-full mb-4 justify-between'>
                    <input
                        value={nama?.title_tm ?? ''}
                        type="text"
                        onChange={(e) => setNama(nama => ({
                          ...nama, 
                          title_tm: e.target.value,  
                          
                      }))}
                        placeholder="Täze türkmençe nama..."
                        // required
                        className="block w-full ml-2 p-2 border rounded-md"
                    />
                    <input
                        value={nama?.title_ru ?? ''}
                        type="text"
                        onChange={(e) => setNama(nama => ({
                          ...nama, 
                          title_ru: e.target.value,
                      }))}
                        placeholder="Täze türkmençe nama..."
                        className="block w-full ml-2 p-2 border rounded-md"
                    />
                  </div>
                    <button
                        type="submit"
                        className="p-1 bg-green-600 text-white rounded hover:bg-green-500 self-end w-[100px] font-semibold text-[18px]"
                    >
                        Goş
                    </button>
                </form>
              </div>
              <div className="w-[300px]  2xl:w-[400px] mx-auto p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold mb-[10px]">
                  Täze perman goş...
                </h2>
                <form onSubmit={permanPost} className='flex flex-col'>
                  <div className='flex flex-col w-full gap-4 mb-4'>
                    <input
                        value={perman?.title_tm ?? ''}
                        type="text"
                        onChange={(e) => setPerman(perman => ({
                          ...perman, 
                          "title_tm": e.target.value,   
                      }))}
                        placeholder="Täze türkmençe perman..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <input
                        value={perman?.title_ru ?? ''}
                        type="text"
                        onChange={(e) => setPerman(perman => ({
                          ...perman, 
                          "title_ru": e.target.value,   
                      }))}
                        placeholder="Täze orsça perman..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <input
                        value={perman?.month ?? ''}
                        type="text"
                        onChange={(e) => setPerman(perman => ({
                          ...perman, 
                          "month": e.target.value,   
                      }))}
                        placeholder="Täze permanyň aýy..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <input
                        value={perman?.month_ru ?? ''}
                        type="text"
                        onChange={(e) => setPerman(perman => ({
                          ...perman, 
                          "month_ru": e.target.value,   
                      }))}
                        placeholder="Täze permanyň orsca aýy..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <input
                        value={perman?.number ?? ''}
                        type="text"
                        onChange={(e) => setPerman(perman => ({
                          ...perman, 
                          "number": e.target.value,   
                      }))}
                        placeholder="Täze permanyň belgisi..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <input
                        value={perman?.year==0 ? '' : perman?.year}
                        type="text"
                        onChange={(e) => !isNaN(Number(e.target.value)) ? setPerman(perman => ({
                          ...perman, 
                          "year": e.target.value ==='' ? 0 : parseInt(e.target.value,10),   
                      })) : ''}
                        placeholder="Täze permanyň ýyly..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <input type="file" onChange={handleFileChange} />
                    <input type="file" onChange={handleFileChange_rus} />
                    <div className=''>
                      <p className='font-roboto mb-2'>Perman güýjini ýitirenmi:</p>
                      <select
                        value={toggle}
                        onChange={()=>setToggle(toggle=> toggle === "false" ? "true":"false")}
                        className="self-center block p-2 border
                      border-gray-600 rounded-md focus:outline-none
                        focus:ring-2 w-1/3 ml-[10px]"
                        >
                          <option value={"true"}>
                              Hawa
                          </option>
                          <option value={"false"}>
                              Ýok
                          </option>
                      </select>
                    </div>
                  </div>
                    <button
                        type="submit"
                        className="p-1 bg-green-600 text-white rounded hover:bg-green-500 self-end w-[100px] font-semibold text-[18px]"
                    >
                        Goş
                    </button>
                </form>
              </div>
              <div className="w-[300px]  2xl:w-[400px] mx-auto p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold mb-[10px]">
                  Güýjini ýitiren nama...
                </h2>
                <hr />
                <h2 className="text-xl font-semibold my-[10px]">
                  Güýjini ýitiren nama üçin ilki saýlawdan degişli permany saýlaň
                </h2>
                <form onSubmit={activePut} className='flex flex-col'>
                  <div className='flex w-full gap-1 mb-4'>
                    <p className='font-roboto font-semibold'>Perman güýjini ýitirenmi:</p>
                    <select
                      value={toggle}
                      onChange={()=>setToggle(toggle=> toggle === "false" ? "true":"false")}
                      className="self-center block p-2 border
                    border-gray-600 rounded-md focus:outline-none
                      focus:ring-2 w-1/3 ml-[10px]"
                    >
                      <option value={"true"}>
                          Hawa
                      </option>
                      <option value={"false"}>
                          Ýok
                      </option>
                    </select>
                  </div>
                    <button
                        type="submit"
                        className="p-1 bg-yellow-600 text-white rounded hover:bg-yellow-500 self-end w-[100px] text-[18px]"
                    >
                        Üýtget
                    </button>
                </form>
              </div>
              <div className="w-[300px]  2xl:w-[400px] mx-auto p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold mb-[10px]">
                  Täze söz goş...
                </h2>
                <form onSubmit={dictionaryPost} className='flex flex-col'>
                  <div className='flex flex-col w-full gap-4 mb-4'>
                    <input
                        value={dictionary?.title_tm ?? ''}
                        type="text"
                        onChange={(e) => setDictionary((dictionary:any) => ({
                          ...dictionary, 
                          "title_tm": e.target.value,   
                      }))}
                        placeholder="Täze türkmençe söz..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <input
                        value={dictionary?.title_ru ?? ''}
                        type="text"
                        onChange={(e) => setDictionary((dictionary:any) => ({
                          ...dictionary, 
                          "title_ru": e.target.value,   
                      }))}
                        placeholder="Täze orsça söz..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <textarea
                        value={dictionary?.description_tm ?? ''}
                        id="textarea"
                        onChange={(e) => setDictionary((dictionary:any) => ({
                          ...dictionary, 
                          "description_tm": e.target.value,   
                      }))}
                        placeholder="Täze söziň düşündirilişi tm..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <textarea
                        value={dictionary?.description_ru ?? ''}
                        id="textarea"
                        onChange={(e) => setDictionary((dictionary:any) => ({
                          ...dictionary, 
                          "description_ru": e.target.value,   
                      }))}
                        placeholder="Täze söziň düşündirilişi ru..."
                        className="block w-full p-2 border rounded-md"
                    />
                  </div>
                    <button
                        type="submit"
                        className="p-1 bg-green-600 text-white rounded hover:bg-green-500 self-end w-[100px] font-semibold text-[18px]"
                    >
                        Goş
                    </button>
                </form>
              </div>
              <div className="w-[300px] 2xl:w-[400px] mx-auto p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold mb-[10px]">
                  Täze maglumat goş...
                </h2>
                <form onSubmit={informationPost} className='flex flex-col'>
                  <div className='flex flex-col w-full gap-4 mb-4'>
                    <input
                      value={information?.title_tm ?? ''}
                      type="text"
                      onChange={(e) => setInformation((information:any) => ({
                        ...information, 
                        "title_tm": e.target.value,   
                      }))}
                      placeholder="Täze türkmençe maglumat..."
                      className="block w-full p-2 border rounded-md"
                    />
                    <input
                        value={information?.title_ru ?? ''}
                        type="text"
                        onChange={(e) => setInformation((information:any) => ({
                          ...information, 
                          "title_ru": e.target.value,   
                      }))}
                        placeholder="Täze orsça maglumat..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <textarea
                        value={information?.description_tm ?? ''}
                        id="textarea"
                        onChange={(e) => setInformation((information:any) => ({
                          ...information, 
                          "description_tm": e.target.value,   
                      }))}
                        placeholder="Täze maglumatyň düşündirilişi tm..."
                        className="block w-full p-2 border rounded-md"
                    />
                    <textarea
                        value={information?.description_ru ?? ''}
                        id="textarea"
                        onChange={(e) => setInformation((information:any) => ({
                          ...information, 
                          "description_ru": e.target.value,   
                      }))}
                        placeholder="Täze maglumatyň düşündirilişi ru..."
                        className="block w-full p-2 border rounded-md"
                    />
                  </div>
                    <button
                        type="submit"
                        className="p-1 bg-green-600 text-white rounded hover:bg-green-500 self-end w-[100px] font-semibold text-[18px]"
                    >
                        Goş
                    </button>
                </form>
              </div>
            </div>
            <div 
              className='flex items-center gap-5 justify-center w-[90%] 2xl:w-[50%] my-[30px]'
            > 
              <select
                  value={selectedDictionary}             
                  onChange={handleSelectDictionary}
                  className="self-center block p-2 border
                  border-gray-600 rounded-md focus:outline-none
                    focus:ring-2 w-1/4"
                >
                <option value={0}>
                  Sözi saýlaň
                </option>
                {
                  (Array.isArray(dictionaries) ? dictionaries : [])?.map((item:any, index) => {
                    return (
                      <option key={index} value={`${item?.id}`}>
                        {item["title_tm"]}
                      </option>
                    )
                  })
                }
              </select>
              <select
                value={selectedInfo}             
                onChange={handleSelectInformation}
                className="self-center block p-2 border
                border-gray-600 rounded-md focus:outline-none
                  focus:ring-2 w-1/4 ml-[10px]"
              >
                  <option value={0}>
                      Maglumaty saýlaň
                  </option>
                {
                  (Array.isArray(informations) ? informations : [])?.map((information:any, index) => {
                    return (
                      <option key={index} value={`${information?.id}`}>
                        {information.title_tm}
                      </option>
                    )
                  })
                  }
                </select>
            </div>
            <div className='flex items-center justify-center w-[90%] xl:w-[50%] mb-[50px] gap-10'>
              <button 
                onClick={() => handleDeleteDictionary(selectedDictionary)}
                className='w-1/4 bg-red-500 text-[16px] font-semibold p-2 rounded-md text-gray-100'
              >
                Saýlanan sözi poz
              </button>
              <button 
                onClick={() => handleDeleteInformation(selectedInfo)}
                className='w-1/4 bg-red-500 text-[16px] font-semibold p-2 rounded-md text-gray-100'
              >
                Saýlanan maglumaty poz
              </button>
            </div>
          </>
      </div>
  )
}

export default AdminPage