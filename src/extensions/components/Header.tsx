import * as React from 'react';

import './Masterpage.css'
import './MasterpageMobile.css'
const icon_card = require('../images/cad.svg')
const logo = require('../images/logo.png')
const icon_hamb = require('../images/menuhambuger.png')
const icon_close = require('../images/close.svg')

const Header = () => {
    
    return (
        <div>
            <div id="header">
                <div className="container-fluid" id="link-rapido">
                    <button className="btn-cadastrar">
                        <img src={icon_card} alt="" />
                        <span>Cadastrar</span>
                    </button>
                    <ul id="icons" className="nav justify-content-end icons">
                    </ul>
                    <ul id="links" className="nav justify-content-end links">
                    </ul>
                </div>
                <div className="containet-fluid" id="header-body">
                    <a href="/sites/Procel/">
                        <img className="logo" src={logo} alt="Logo" />
                    </a>
                    <div className="right-side desktop">
                        <input type="text" placeholder="O que você procura neste site?" />
                        {/* <button className="btn-openmenu navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <img className="" src={icon_hamb} alt="btn-menu" />
                        </button> */}
                    </div>
                </div>
                <div className="right-side search-mobile">
                    <input type="text" placeholder="O que você procura?" />
                    {/* <button type="button" className="btn btn-clean-search">
                        <img src={icon_close} alt="limpar" />
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default Header