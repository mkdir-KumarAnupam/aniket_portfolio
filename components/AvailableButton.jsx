"use client";

import React from "react";

const AvailableButton = () => {
    return (
        <div className="button-body">
            <button className="available-for-btn">
                <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                </div>
                Available for new project
            </button>

            <style jsx>{`
                .button-body {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: fit-content;
                    height: fit-content;
                }

                .available-for-btn {
                    font-family: system-ui, sans-serif;
                    --animation: 2s ease-in-out infinite;
                    --color: black;
                    display: flex;
                    align-items: center;
                    column-gap: 2px;
                    color: black;
                    background-color: #1b1b1b1b !important;
                    border-radius: 100px;
                    padding: 1rem 1.5rem 1rem 0.5rem;
                    outline: none;
                    border: 2px solid black;
                    font-weight: 600;
                    position: relative;
                    transition: 0.2s ease-in-out;
                    cursor: pointer;
                    font-size: 16px;
                }

                .available-for-btn:hover {
                    background-color: #f4f4f4;
                }

                .available-for-btn:active {
                    background-color: #eaeaea;
                    border: 2px solid black;
                }

                .circle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    width: 16px;
                    height: 16px;
                    border: solid 2px black;
                    border-radius: 50%;
                    margin: 0 10px;
                    background-color: transparent;
                    animation: circle-keys var(--animation);
                }

                .circle .dot {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: black;
                    animation: dot-keys var(--animation);
                }

                .circle .outline {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    animation: outline-keys var(--animation);
                }

                @keyframes circle-keys {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }

                    50% {
                        transform: scale(1.5);
                        opacity: 0.5;
                    }

                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes dot-keys {
                    0% {
                        transform: scale(1);
                    }

                    50% {
                        transform: scale(0);
                    }

                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes outline-keys {
                    0% {
                        transform: scale(0);
                        outline: solid 20px var(--color);
                        outline-offset: 0;
                        opacity: 1;
                    }

                    100% {
                        transform: scale(1);
                        outline: solid 0 transparent;
                        outline-offset: 20px;
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default AvailableButton;
