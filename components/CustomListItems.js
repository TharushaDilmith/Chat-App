import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem , Avatar } from 'react-native-elements'

const CustomListItems = ({id,chatName,enterChat}) => {
    return (
        <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)} >
            <Avatar rounded source={{uri:"https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"}} />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    This is a test subtitle
                    This is a test subtitle
                    
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItems

const styles = StyleSheet.create({})
