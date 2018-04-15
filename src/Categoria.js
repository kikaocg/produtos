import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Categoria extends Component {

    constructor (props) {
        super(props);
        this.renderProduto = this.renderProduto.bind(this);
        this.state = {
            produtos: [],
            categoria: {},
            id: {}
        }
    }

    loadData(id) {
        this.setState({id});
        this.props.loadProdutos(id);
        this.props.loadCategoria(id);
    }

    componentDidMount() {
        const id = this.props.match.params.catId;
        this.loadData(id)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.catId !== this.state.id) {
            this.loadData(newProps.match.params.catId)
        }
    }

    renderProduto(produto){
        return (
            <div className="well row" key={produto.id}>{produto.produto}
                <button className='btn alert-danger pull-right ' onClick={ () => {
                    this.props.removeProduto(produto)
                        .then(res => this.loadData(this.props.match.params.catId))
                }}>Excluir</button>
                <div style={{marginRight:5}} className='btn btn-info pull-right'>
                    <Link style={{listStyle: 'none', color: '#ffffff', textDecoration: 'none'}} to={'/produtos/editar/'+produto.id}>Editar</Link>
                </div>
            </div>
        )
    }

    render () {
        return (
            <div>
                <h1>{this.props.categoria.categoria}</h1>
                {this.props.produtos.length === 0 &&
                    <p className='alert alert-info'>Nenhum produto disponível no momento</p>
                }
                {this.props.produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria