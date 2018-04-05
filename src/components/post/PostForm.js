import React, { Component } from  'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { bookUpdate } from '../../actions';
import { CardSection, Input } from '../common';

class PostForm extends Component{
    render() {
        return(
            <View style={{flex:1}}>
                <CardSection>
                    <Input
                        label="Title"
                        placeholder="title"
                        value={this.props.title}
                        onChangeText={value => this.props.bookUpdate({prop:'title',value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Author"
                        placeholder="author"
                        value={this.props.author}
                        onChangeText={value => this.props.bookUpdate({prop:'author',value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Edition"
                        placeholder="edition"
                        value={this.props.edition}
                        onChangeText={value => this.props.bookUpdate({prop:'edition',value})}
                    />
                </CardSection>
                
                <CardSection>
                    <Text style={styles.pickerTextStyle}>Condition</Text>
                    <Picker
                        selectedValue={this.props.condition}
                        onValueChange={value => this.props.bookUpdate({prop:'condition', value})}
                        style={{flex:1}}
                        >
                        <Picker.Item label="Excellent" value="E"/>
                        <Picker.Item label="Good" value="G"/>
                        <Picker.Item label="OK" value="O"/>
                        <Picker.Item label="Poor" value="P"/>
                    </Picker>
                </CardSection>
                
                <CardSection>
                    <Input
                        label="Price"
                        placeholder="$$$$"
                        value={this.props.price}
                        onChangeText={value => this.props.bookUpdate({prop:'price',value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Notes"
                        placeholder="(optional)"
                        value={this.props.notes}
                        onChangeText={value => this.props.bookUpdate({prop:'notes',value})}
                    />
                </CardSection>
            </View>

        )
    }
}

const styles = {
    pickerTextStyle: {
        fontSize:18,
        paddingLeft:20,
        flex:1
    }
}

const mapStateToProps = (state) => {
    const { title, author, edition, condition, price, picture, notes } = state.post;

    return { title, author, edition, condition, price, picture, notes };

};

export default connect(mapStateToProps, { bookUpdate} )(PostForm);