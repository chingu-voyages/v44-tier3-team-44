import { Card, CardBody, Image, Text, VStack} from '@chakra-ui/react'

function NewsArticle(props){
    return(<div>
        <VStack spacing={10} direction='row' >
        <Card w='400px' h='400px'>
        <CardBody key='id'>
        <Text>{props.title}</Text>
        <Image alt="add image here"/>
        <Text>{props.author}</Text>
        </CardBody>
        </Card>
        </VStack>

    </div>
    )
}

export default NewsArticle