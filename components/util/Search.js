import React, {Component} from 'react';
import { SearchBar } from 'react-native-elements';

class Search extends Component{
    constructor(props) {
        super(props);    
        this.state = {
            search: '',
            name: "Search " + this.props.name + "' " + this.props.action + " List"
        };    
      }  
    
      updateSearch = search => {
        this.setState({ search });
      };
    
    render() {
        const { search,name } = this.state;
        
        return (
                <SearchBar
                    placeholder={name}
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme = {true}
                    inputStyle = {{color:'#696969'}}
                />
        );
    }
}

export default Search;