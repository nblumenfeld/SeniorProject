import React, { Component } from 'react';
import { 
    Text
} from 'react-native';
import firebase from 'firebase';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Spinner from './common/Spinner';
import Button from './common/Button';

class LoginForm extends Component {
    constructor(props) {
        super(props);
      }

    state={email:'', password:'', error:'', loading: false };

    onButtonPress() {
        const {email,password,error,loading} = this.state;

        this.setState({error:'',loading:true});

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch( () => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this) );
            }); 
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication failed.',
            loading:false
        });
    }

    onLoginSuccess() {
        this.setState({
            email:'',
            password:'',
            loading:false,
            error:'',

        })
    }

    renderButton() {
        if(this.state.loading){
            return <Spinner size='small'/>
        }
        
        return( 
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
            );
    }
      
    render() {
        return ( 
            <Card>
                <CardSection>
                    <Input
                    label='Email'
                    placeholder='user@gmail.com'
                    autoCorrect={false}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})} 
                    />
                </CardSection>
                <CardSection>
                    <Input
                    label='Password'
                    secureTextEntry={true}
                    placeholder='password'
                    autoCorrect={false}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}        
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize:20,
        alignSelf:'center',
        color: 'red' 
    }
};


export default LoginForm;