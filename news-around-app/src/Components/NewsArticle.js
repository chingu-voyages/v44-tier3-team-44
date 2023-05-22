import { Card, CardBody, Image, Text, VStack} from '@chakra-ui/react'

function NewsArticle(){
    return(<div>
        <VStack spacing={10} direction='row' >
        <Card w='400px' h='400px'>
        <CardBody key='id'>
        <Text>Headline</Text>
        <Image alt="add image here"/>
        <Text>Brief summary of article</Text>
        </CardBody>
        </Card>
        </VStack>

    </div>
    )
}

export default NewsArticle