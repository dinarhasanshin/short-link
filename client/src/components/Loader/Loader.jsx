import React from 'react'
import s from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={"preloader-wrapper active" + " " + s.loader}>
            <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div>
                <div className="gap-patch">
                    <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}