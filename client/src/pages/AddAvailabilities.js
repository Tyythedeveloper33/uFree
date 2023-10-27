import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { monthAndDay } from '../utils/convertDate';
import { useMutation } from "@apollo/client";
import { ADD_AVAILABILITY } from "../utils/mutations";
import DayOfWeekSelector from '../components/DayOfWeekSelector';

const ALL_DAY = { start: 0, end: 24 };

const Availabilities = () => {

    const [avails, setAvails] = useState({
        monday: {...ALL_DAY},
        tuesday: {...ALL_DAY},
        wednesday: {...ALL_DAY},
        thursday: {...ALL_DAY},
        friday: {...ALL_DAY},
        saturday: {...ALL_DAY},
        sunday: {...ALL_DAY},
    });

    const formattedAvails = Object.keys(avails).map(day => {
        return {
            day: day,
            start: avails[day].start,
            end: avails[day].end,
        }
    })

    const navigate = useNavigate();
    const params = useParams();
    const [showAlert, setShowAlert] = useState(false); // State for displaying alerts
    const [error, setError] = useState(""); // State for storing error messages
    const [makeAvailibility] = useMutation(ADD_AVAILABILITY, {
        variables: { 
            ...formattedAvails,
            eventId: params.eventId,
        },
    });
    
    async function handleFormSubmit(event) {
        event.preventDefault();
        // Perform user registration by calling the addUser mutation
        const { data, error } = await makeAvailibility();

        if (error) {
            console.error("Failed to make availablity");
            setError(error.message);
            setShowAlert("Failed to make availability. Please try again.");
            return;
        }
        console.log(' avilabilty-Data:', data);

        // navigate('/eventPage');
    }

    const eventWeek = Date.now();

    return (
        <section id="content_availabilities_page">
            <h1 className='text-align-start'>Add Your Availabilities</h1>
            <p className='text-align-start'>Week of {monthAndDay(eventWeek)}</p>

            <form onSubmit={handleFormSubmit}>
                <DayOfWeekSelector setAvails={setAvails} avails={avails}/>

                <button type="submit" className='btn_large btn_accent'>Submit</button>
            </form>
        </section>
    );
};

export default Availabilities;