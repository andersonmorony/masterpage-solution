import * as React from 'react';
import { sp } from '@pnp/sp';

import './Masterpage.css'
import './MasterpageMobile.css'
const icon_card = require('../images/cad.svg')
const logo = require('../images/logo.png')

export interface ImyState {
    links?: any []
    icones?: any []
}

export default class Header extends React.Component<{ context }, ImyState> {

    constructor(props) {
        super(props);

        sp.setup({
            spfxContext: this.props.context
        });

        this.state = {
            links: [],
            icones: []
        }
    }


    async getList() {
            try {
                const listName = "Links Rapidos";
                const filter = "Status eq 1";
                const select = "Title, Link, AttachmentFiles";
                const expand = "AttachmentFiles"
                const orderBy = "Ordem";
                const isAscending = true;
        
                const list = sp.web.lists.getByTitle(listName);
                let items = list.items;
                if (filter) items = items.filter(filter);
                if (select) items = items.select(select);
                if (expand) items = items.expand(expand);
                if (orderBy) items = items.orderBy(orderBy, isAscending);
        
                const response = await items.get();
                console.log(response)

                const _links = response.filter((item) => !item.Attachments)
                const _icons = response.filter((item) => item.Attachments)
                this.setState({links: _links, icones: _icons })

            }catch(ex)
            {
                console.log(ex);
            }
        }

    componentDidMount() {
        this.getList();
    }

    public render(): React.ReactElement<{}> {

        const { icones, links } = this.state;

        return (
            <div id="header">
                <div className="container-fluid" id="link-rapido">
                    <button className="btn-cadastrar">
                        <img src={icon_card} alt="" />
                        <span>Cadastrar</span>
                    </button>
                    <ul id="icons" className="nav justify-content-end icons">
                        {icones.length > 0 ? icones.map((icon) => {
                            return (
                                <div>
                                    <a className="nav-link" aria-current="page" href={icon.Link.Url}>
                                        {icon.Title}                            
                                    </a>
                                </div>
                            )
                        }): null }
                    </ul>
                    <ul id="links" className="nav justify-content-end links">
                        {links.length > 0 ? links.map((link) => {
                            return (
                                <a className="nav-link" aria-current="page" href={link.Link.Url}>
                                    {link.Title}                            
                                </a>
                            )
                        }): null }
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
        )
    }
}
