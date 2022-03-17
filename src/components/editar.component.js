import React from 'react'
import axios from 'axios'

class editar extends React.Component{

    state = {
        form:{
            'clasificacion': '',
            'categorias': '',
            'sub_categoria': '',
        },
        error:false,
        errorMsg:'',    
    }

    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            
            }
        })
        console.log(this.state.form);
    }

    put = () => {
        let url = "http://localhost:3001/api/v1/categorias/" //Url backend
        axios.put(url, this.state.form)
        .then(response =>{
            console.log(response);
        })
    }

    manejadorSumbit = e =>{
        e.preventDefault();
        this.put();
    }

    componentDidMount(){
        let categoriaId = this.props.match.params.id;
        let url = "http://localhost:3001/api/v1/categorias"; //Url backend
        axios.get(url)
        .then((response) => {
            console.log(response)
            this.setState({
                form:{
                    'clasificacion': response.data[0].clasificacion,
                    'categorias': response.data[0].categoria,
                    'sub_categoria': response.data[0].sub_categoria,
                }
            })
        });
    }


    render(){const form = this.state.form
        return(
            <div>
                <h1>Editar Categoria</h1>
                <form onSubmit={this.manejadorSumbit}>
                <div className="form-group">
                        <label>Clasificacion</label>
                        <input type="text" className="form-control" placeholder="Clasificacion" value={form.clasificacion} onChange={manejadorChange}/>
                    </div>
                    <div className="form-group">
                        <label>Categoria</label>
                        <input type="text" className="form-control" placeholder="Categoria" value={form.categorias} onChange={manejadorChange} />
                    </div>
                    <div className="form-group">
                        <label>Sub Categoria</label>
                        <input type="text" className="form-control" placeholder="Sub Categoria" value={form.sub_categoria} onChange={manejadorChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>this.put()}>Guardar</button>
                </form>
            </div>
        )
    }
}
export default editar