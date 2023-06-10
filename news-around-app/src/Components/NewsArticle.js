import { Card, CardBody, Image, Text, SimpleGrid, Flex, useBreakpointValue, Link, Box} from '@chakra-ui/react'
import { faker } from '@faker-js/faker';

function NewsArticle({allArticles}){
  const columnCount = useBreakpointValue({ base: 1, md: 2 });
  return (
    <SimpleGrid columns={columnCount} spacing={10} justifyItems="center" marginLeft="100px" marginRight="100px">
      {allArticles.map(({ title, author, source, url, urlToImage }, index) => (
        <Link href={url} isExternal>
        <Card w="500px" h="200px" key={title}>
          <CardBody>
          <Text color={'black'} fontWeight={'semibold'} marginBottom={3}>{title}</Text>
          <Flex align="center">
              <Image src={faker.image.image() + `?random=${index}`} alt="News Image" boxSize="100px" objectFit="cover" borderRadius="10px" />
              <Flex direction="column" ml={4}>
                <Text>Written By {author}</Text>
                <Text>Published From {source}</Text>
                <Box>
                <Image src={urlToImage}/>
                </Box>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        </Link>
      ))}
    </SimpleGrid>
  );
}

export default NewsArticle

// <Link to={url}>


/**
return(<div>
    {allArticles.map(({title, author, source})=>(
        <VStack spacing={20} direction='row' >
        <Card w='400px' h='400px' key={title}>
        <CardBody>
        <Image ></Image>
        <Text color="#0050C8" >{title}</Text>
        <Text>{author}</Text>
        <Text>{source}</Text>
        </CardBody>
        </Card>
        </VStack>
    ))}
       
    </div>
    )
 */











// src="https://media.discordapp.net/attachments/1101934137029435533/1113442514104483840/What_Happens_logo.png?width=936&height=936"

/**
 * <div>
    {searchedData.slice(0,10).map(({ id, name, house, image, ancestry, patronus}) => (
      <VStack spacing={10} direction='row'>
      <Card w='400px' h='400px'>
        <CardBody key={id}>
          <Text fontSize='2xl'>{name}</Text>
          <Text fontSize='l'>House: {house}</Text>
          <Text fontSize='l'>Ancestry: {ancestry}</Text>
          <Text fontSize='l'>Patronous: {patronus}</Text>
          <Image src={image} alt={name}  boxSize='200px'/>
        </CardBody>
        </Card>
        </VStack>
      ))}
        </div>
 */