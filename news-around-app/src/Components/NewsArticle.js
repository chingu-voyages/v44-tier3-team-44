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













