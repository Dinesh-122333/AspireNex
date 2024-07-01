import React from "react";

export default function Adminquiz(){
    return(
        <>
        <div className="">
            <p className="display-6">Quiz Maker</p>
            <p>Question 1</p>
            <form action="">
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" for="flexRadioDefault1">
                Answer1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" for="flexRadioDefault1">
                Answer2
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" for="flexRadioDefault1">
                Answer3
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" for="flexRadioDefault1">
                Answer4
                </label>
            </div><div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" for="flexRadioDefault1">
                Answer5
                </label>
            </div>
            </form>
            <p>Real answer</p>
            <input type="text" placeholder="Answer"/>
        </div>
        </>
    )
}