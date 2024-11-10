import React from 'react'
import { useAuth } from '../utils/auth';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUrl } from '../api';
import '../styles/hrdashboard.css'
import { useDispatch } from 'react-redux';
import { FLASH_SUCCESS, FLASH_ERROR } from '../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import { fetchAllTask } from "../ApiService/api";
import 'react-datepicker/dist/react-datepicker.css';
import Hrtaskpost from './HrtodoList/Hrtaskpost';
import { DataGrid } from '@mui/x-data-grid';


function TLDashboard({ employees, setEmployees }) {
    const auth = useAuth();
    const userId = auth.loggedUser?._id || null;

    const [curDept, setCurDept] = useState('AllDepts.')
    const [scoresData, setScoresData] = useState([])
    const [moodData, setMoodData] = useState([])
    const [circleData, setCircleData] = useState({})
    const [curLineMonth, setLineCurMonth] = useState(new Date().toLocaleString('default', { month: 'long' }))
    const [curBarMonth, setBarCurMonth] = useState(new Date().toLocaleString('default', { month: 'long' }))
    const [curStressMonth, setCurStressMonth] = useState(new Date())
    const [lineChartData, setLineChartData] = useState([])
    const [barGraphData, setBarGraphData] = useState([])
    const [moodParams, setMoodParams] = useState({ data: { 'LOW': 0, 'MODERATE': 0, 'OPTIMUM': 0, 'HIGH': 0, 'TOO MUCH': 0 }, userCount: 0 })
    const [tasks,setTasks]=useState([])

    const [circlessqrData, setcirclessqrData] = useState([
        { radius: 7, param: 'positivity', color: '#028A0F', left: '20%', top: '10%' },
        { radius: 4, param: 'engagement', color: '#B0FC38', left: '60%', top: '10%' },
        { radius: 5, param: 'relationship', color: '#3A5311', left: '20%', top: '50%' },
        { radius: 3, param: 'meaning', color: '#3DED97', left: '60%', top: '50%' },
    ])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const currentDept = e.target.value;
        setCurDept(currentDept);
        setCircleScore(currentDept, scoresData);
        setLineGraph(curLineMonth, currentDept, scoresData);
        setBarData(curBarMonth, currentDept, scoresData);
        setStressDistrubtion(curStressMonth, currentDept);  // Ensure this is called with correct values
    }

    const getWeekOfMonth = (dateString) => {
        const date = new Date(dateString);
        const dayOfMonth = date.getDate();
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        return weekOfMonth > 4 ? 4 : weekOfMonth;

    }

    const handleStressChange = (date) => {
        setCurStressMonth(date);
        setStressDistrubtion(date, curDept)
    }

    const stressColors = ['#C271FE', '#FCFF66', '#2BC702', '#FF7304', '#FF020D']

    const setStressDistrubtion = (currentDate, currentDept) => {
        const params = {
            'LOW': 0,
            'MODERATE': 0,
            'OPTIMUM': 0,
            'HIGH': 0,
            'TOO MUCH': 0
        };

        const distinctUsers = new Set();

        moodData.forEach(record => {
            const recordDate = new Date(record.date);

            const isSameDate = recordDate.getDate() === currentDate.getDate() &&
                recordDate.getMonth() === currentDate.getMonth() &&
                recordDate.getFullYear() === currentDate.getFullYear();

            // Determine if the department check should be applied
            const isSameDept = currentDept === 'AllDepts.' || record.user.team === currentDept;
            if (isSameDate && isSameDept) {
                const moodCategory = record.data.toUpperCase();  // Ensure the moodCategory is in uppercase

                if (params[moodCategory] !== undefined) {
                    params[moodCategory]++;
                } else {
                    console.warn(`Unexpected moodCategory: ${moodCategory}`);
                }

                distinctUsers.add(record.user.email);
            }
        });

        const distinctUserCount = distinctUsers.size;

        setMoodParams({ data: params, userCount: distinctUserCount });
    }

    const setCircleScore = (currentDept, allScoresData) => {
        let params = { 'positivity': 0, 'engagement': 0, 'relationship': 0, 'meaning': 0 }
        let count = 0;
        allScoresData.forEach((score) => {
            if (currentDept == 'AllDepts.') {
                count++;
                score.data.forEach(data => {
                    let result = params[data.parameter] + data.value;
                    params = { ...params, [data.parameter]: result }
                })
            }
            else if (score.user.team == currentDept) {
                count++;
                score.data.forEach(data => {
                    let result = params[data.parameter] + data.value;
                    params = { ...params, [data.parameter]: result }
                })
            }
        })

        Object.keys(params).forEach(key => {
            params[key] = (params[key] / count).toFixed(1);
        });
        setCircleData(params)
        let sqrcircleDat = circlessqrData;

        Object.keys(params).forEach((param) => {
            sqrcircleDat.forEach((val) => {
                if (val.param == param) {
                    val.radius = 1.9 * Number(params[param])
                }
            })
        })
    }

    const handleLineGraphChange = (e) => {
        const currentMonth = e.target.value;
        setLineCurMonth(e.target.value);
        setLineGraph(currentMonth, curDept, scoresData)
    }

    const getAllTasks = async ()=>{
        const response = await fetchAllTask();
        setTasks(response)
    }

    const columns = [
        { field: '_id', headerName: 'TL ID', width: 240 },
        { field: 'date', headerName: 'Date', width: 110 },
        { field: 'task', headerName: 'Task', width: 150 }, 
        { field: 'status', headerName: 'Status', width: 150 }, 
        { field: 'priority', headerName: 'Priority', width: 150 },
    ];

    const setLineGraph = (currentMonth, currentDept, allScoresData) => {
        let params = [
            {
                weekName: "",
                value: 0
            },
            {
                weekName: "Week 1",
                value: 0
            },
            {
                weekName: "Week 2",
                value: 0
            },
            {
                weekName: "Week 3",
                value: 0
            },
            {
                weekName: "Week 4",
                value: 0
            },
            {
                weekName: "",
                value: 0
            }
        ]
        let newScore = []

        allScoresData.forEach((score) => {
            const dateObject = new Date(score.date);
            const monthString = dateObject.toLocaleString('en-US', { month: 'long' });

            if (currentDept == 'AllDepts.' && monthString === currentMonth) {
                newScore.push(score)
            }
            else if (score.user.team == currentDept && monthString === currentMonth) {
                newScore.push(score)
            }


        })
        let weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

        weeks.forEach(week => {
            let sum = 0
            let count = 0
            newScore.forEach((score) => {
                if (`Week ${getWeekOfMonth(score.date)}` == week) {

                    score.data.forEach((val) => {
                        sum += val.value;
                        count++
                    })
                }
            })
            sum = Number((sum / count).toFixed(1))
            for (let i = 0; i < params.length; i++) {
                if (params[i].weekName === week) {
                    if (isNaN(sum)) {
                        sum = 0;
                    }
                    params[i].value = sum;
                    break; // Stop the loop once the weekName is found and updated
                }
            }
        });
        setLineChartData(params)
    }

    const handleBarGraphChange = (e) => {
        const currentMonth = e.target.value;
        setBarCurMonth(e.target.value);
        setBarData(currentMonth, curDept, scoresData)
    }
    const setBarData = (currentMonth, currentDept, allScoresData) => {
        let params = [
            { weekName: "Week 1", lowest: 0, median: 0, highest: 0 },
            { weekName: "Week 2", lowest: 0, median: 0, highest: 0 },
            { weekName: "Week 3", lowest: 0, median: 0, highest: 0 },
            { weekName: "Week 4", lowest: 0, median: 0, highest: 0 },
        ];

        let newScore = [];

        allScoresData.forEach((score) => {
            const dateObject = new Date(score.date);
            const monthString = dateObject.toLocaleString('en-US', { month: 'long' });

            if (currentDept === 'AllDepts.' && monthString === currentMonth) {
                newScore.push(score);
            } else if (score.user.team === currentDept && monthString === currentMonth) {
                newScore.push(score);
            }
        });

        let weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

        weeks.forEach(week => {
            let weeklyScores = [];

            // Collect all scores for the given week
            newScore.forEach((score) => {
                if (`Week ${getWeekOfMonth(score.date)}` === week) {
                    let totalParamsAverage = 0;
                    score.data.forEach((val) => {
                        totalParamsAverage += val.value;
                    });
                    const avgScore = Number((totalParamsAverage / score.data.length).toFixed(1));
                    weeklyScores.push(avgScore);
                }
            });

            if (weeklyScores.length > 0) {
                // Calculate lowest, highest, and median
                const lowest = Math.min(...weeklyScores);
                const highest = Math.max(...weeklyScores);
                const median = Number((weeklyScores.reduce((acc, curr) => acc + curr, 0) / weeklyScores.length).toFixed(1));

                // Apply the transformation: highest = highest - median, median = median - lowest
                const adjustedHighest = Number((highest - median).toFixed(1));
                const adjustedMedian = Number((median - lowest).toFixed(1));

                // Update params for the given week
                for (let i = 0; i < params.length; i++) {
                    if (params[i].weekName === week) {
                        params[i].lowest = lowest;
                        params[i].median = adjustedMedian;
                        params[i].highest = adjustedHighest;
                        break;
                    }
                }
            }
        });

        setBarGraphData(params);
    };

    const handleLogout = async () => {
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`${apiUrl}/logout`, config)

        if (data.type === 'success')
            auth.logOut()

        if (data.type === "success") {
            dispatch({ type: FLASH_SUCCESS, payload: data.message })
        }
        else
            dispatch({ type: FLASH_ERROR, payload: data.message })

        navigate('/', { replace: true })
    }

    useEffect(() => {
        const getAvgScores = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`,
                    },
                };

                const { data } = await axios.get(`${apiUrl}/avgscores`, config);
                if (data) {
                    setScoresData(data.data);
                    setCircleScore('AllDepts.', data.data);
                    setBarData(new Date().toLocaleString('default', { month: 'long' }), 'AllDepts.', data.data); // Added this to initialize bar chart data
                }
            } catch (err) {
                console.log(err.message);
            }
        };

        const getStress = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`,
                    },
                };
                const { data } = await axios.get(`${apiUrl}/getMood`, config);
                if (data) {
                    setMoodData(data.data)
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        getStress()
        getAvgScores();
    }, [userId, auth.token]);

    useEffect(() => {
        if (scoresData.length > 0) {
            const month = new Date().toLocaleString('default', { month: 'long' });
            setLineGraph(month, 'AllDepts.', scoresData);
            setBarData(month, 'AllDepts.', scoresData); // Ensure bar chart data is updated when scoresData changes
        }
    }, [scoresData]); // Trigger this effect whenever scoresData is updated

    useEffect(()=>{
        getAllTasks()
    },[])

    return (
        <>
            <div className='dashboard-container'>
                <div class="hr-heading">
                    <div className='hr-heading-container'>

                        <div class="hr-icon">HummingBEE</div>
                        <div class="lines">
                            <div class="hr-line"></div>
                            <div class="hr-line"></div>
                            <div class="hr-line"></div>
                            <div class="hr-line"></div>
                            <div class="hr-line"></div>
                        </div>
                    </div>
                </div>
                <Hrtaskpost employees={employees} setEmployees={setEmployees} />

                <div className='view-tasks'>
                    <h1>TASKS ASSIGNED</h1>
                <DataGrid 
                style={{ color: "white" }}
                rows={tasks.map((item, index) => ({ id: index, ...item }))}
                columns={columns}
                pageSize={5}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'black',
                        color: 'black',
                    },
                    '& .MuiDataGrid-cell': {
                        color: 'white',
                    },
                    '& .MuiDataGrid-row': {
                        backgroundColor: '#1e1e1e',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#333',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: 'black',
                        color: 'white',
                    },
                    '& .MuiTablePagination-root': {
                        color: 'white',
                    }
                }}
            />
            <br /> <br />
                </div>
            </div>
        </>
    )
}



export default TLDashboard