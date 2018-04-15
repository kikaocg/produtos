import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class ProdutosEditar extends Component {
    constructor(props) {
        super(props);
        this.handleEditProduto = this.handleEditProduto.bind(this);

        this.state = {
            redirect: false,
            categoria: this.props.categoria
        }
    }

    loadProduto(){
        this.props.readProduto(this.props.match.params.id)
            .then(res => {
                this.refs.produto.value = res.data.produto;
                this.refs.categoria.value = res.data.categoria
            })
    }

    componentWillMount() {
        this.loadProduto()
    }

    componentDidMount(){
        this.loadProduto()
    }

    handleEditProduto(){
        const produto = {
            id: this.props.match.params.id,
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        };
        this.props.editProduto(produto)
            .then((res) => this.setState({
                redirect: '/produtos/categoria/' + produto.categoria
            }))
    }

    render () {
        const {categorias} = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div>
                <h2>Editar Produto</h2>
                <div className='row'>
                    <label className="col-xs-2 col-sm-2 col-md-1">Categoria</label>
                    <div className="col-xs-10 col-sm-10 col-md-11">
                        <select ref='categoria' className='form-control' name="cat" id="cat">
                            {categorias.map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)}
                        </select>
                    </div>
                </div>
                <br/>
                <input ref='produto' className='form-control'
                       placeholder='Nome do produto'/><br/>
                <button className='btn btn-info pull-right' onClick={this.handleEditProduto}>Salvar</button>
            </div>
        )
    }
}

export default ProdutosEditar