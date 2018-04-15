import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class ProdutoNovo extends Component {
    constructor(props){
        super(props);
        this.handleNewProduto = this.handleNewProduto.bind(this);

        this.state = {
            redirect: false
        }
    }

    handleNewProduto() {
        const produto = {
            produto: this.refs.produto.value,
            categoria:  this.refs.categoria.value
        };
        this.props.createProduto(produto)
            .then((res) => this.setState({
                redirect: '/produtos/categoria/' + produto.categoria
            }))
    }

    render() {
        const {categorias} = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div>
                <h2>Novo Produto</h2>
                <div className='row'>
                    <label className="col-xs-2 col-sm-2 col-md-1">Categoria</label>
                    <div className="col-xs-10 col-sm-10 col-md-11">
                        <select ref='categoria' className='form-control' name="cat" id="cat">
                            {categorias.map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)}
                        </select>
                    </div>
                </div>
                <br/>
                <input ref='produto' className='form-control' placeholder='Nome do novo produto'/><br/>
                <button className='btn btn-info' onClick={this.handleNewProduto}>Salvar</button>
            </div>
        )
    }
}

export default ProdutoNovo