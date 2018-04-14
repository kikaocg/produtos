import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import axios from 'axios'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import Api from './Api'

class Produtos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: []
        };
        this.handleNewCategoria = this.handleNewCategoria.bind(this);
        this.renderCategoria = this.renderCategoria.bind(this);
    }

    render() {
        const {match} = this.props;
        const {categorias} = this.state;
        return (
            <div className="row">
                <div className="col-sm-4 col-md-2">
                    <h3>Categorias</h3>
                    <ul>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className="well well-sm">
                        <input className='form-control' type="text" onKeyUp={this.handleNewCategoria}
                               ref='novaCategoria'
                               placeholder='Nova categoria'/>
                    </div>
                </div>
                <div className="col-sm-8 col-md-10">
                    <Route exact path={match.url} component={ProdutosHome}/>
                    <Route exact path={match.url + '/categoria/:catId'} component={Categoria}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.loadCategorias();
    }

    loadCategorias() {
        Api.loadCategorias()
            .then(res => {
                    this.setState({
                        categorias: res.data
                    })
                }
            )
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            axios.post('http://localhost:3001/categorias', {
                categoria: this.refs.novaCategoria.value
            }).then(res => {
                    this.refs.novaCategoria.value = '';
                    this.loadCategorias();
                }
            )
        }
    }

    removeCategoria(cat) {
        Api.deleteCategoria(cat.id)
            .then(res => this.loadCategorias())
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                <button className="btn btn-xs alert-danger" onClick={() => this.removeCategoria(cat)}>
                    <span className="glyphicon glyphicon-remove "/>
                </button>
                &ensp;
                <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
            </li>
        )
    }
}

export default Produtos