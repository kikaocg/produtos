import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutoNovo from "./ProdutoNovo";
import ProdutosEditar from './ProdutosEditar'

class Produtos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editingCategoria: {},
            categoria: {}
        };

        this.handleNewCategoria = this.handleNewCategoria.bind(this);
        this.renderCategoria = this.renderCategoria.bind(this);
        this.handleEditCategoria = this.handleEditCategoria.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
    }

    render() {
        const {match, categorias} = this.props;
        return (
            <div className="row">
                <div className="col-sm-4 col-md-2">
                    <h3>Categorias</h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className="well well-sm">
                        <input className='form-control' type="text"
                               onKeyUp={this.handleNewCategoria}
                               ref='novaCategoria'
                               placeholder='Nova categoria'/>
                    </div>
                    <Link to={'/produtos/novo/'}>Novo produto</Link>
                </div>
                <div className="col-sm-8 col-md-10">
                    <Route exact path={match.url} component={ProdutosHome}/>
                    <Route exact path={match.url+'/novo'} render={(props) => {
                        return <ProdutoNovo {...props}
                                            categorias={categorias}
                                            createProduto={this.props.createProduto}/>
                    }}/>
                    <Route path={match.url+'/editar/:id'}
                           render={(props) => {
                            return <ProdutosEditar
                                {...props}
                                categoria = {this.props.categoria}
                                categorias={categorias}
                                readProduto={this.props.readProduto}
                                editProduto={this.props.editProduto}/>
                           }}/>
                    <Route exact path={match.url + '/categoria/:catId'}
                           render={(props) => {
                               return <Categoria {...props}
                                                 produtos = {this.props.produtos}
                                                 categoria = {this.props.categoria}
                                                 removeProduto = {this.props.removeProduto}
                                                 loadCategoria = {this.props.loadCategoria}
                                                 loadProdutos = {this.props.loadProdutos}/>
                           }}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.loadCategorias();
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.novaCategoria.value
            });
            this.refs.novaCategoria.value = '';
        }
    }

    handleEditCategoria(key) {
        if (key.keyCode === 13) {
            this.props.editCategoria({
                id: this.state.editingCategoria,
                categoria: this.refs['cat-'+this.state.editingCategoria].value
            });
            this.setState({
                editingCategoria: ''
            });
        }
    }

    initEditCategoria(categoria) {
        this.setState({
            editingCategoria: categoria.id
        })
    }

    cancelEditing() {
        this.setState({
            editingCategoria: ''
        })
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                {this.state.editingCategoria === cat.id &&
                <div className='input-group'>
                    <div className="input-group-btn">
                        <input className='form-control' onKeyUp={this.handleEditCategoria}
                               ref={'cat-'+cat.id} type="text" defaultValue={cat.categoria}/>
                        <button className="btn" onClick={this.cancelEditing}>Cancel</button>
                    </div>
                </div>
                }
                {this.state.editingCategoria !== cat.id &&
                <div>
                    <button style={{marginRight: 2}} className="btn btn-xs alert-danger"
                            onClick={() => this.props.removeCategoria(cat)}>
                        <span className="glyphicon glyphicon-remove "/>
                    </button>
                    <button className="btn btn-xs" onClick={() => this.initEditCategoria(cat)}>
                        <span className="glyphicon glyphicon-pencil "/>
                    </button>&ensp;
                    <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
                </div>
                }
            </li>
        )
    }
}

export default Produtos