import { Card, CardBody, Image, Text, SimpleGrid, Flex, useBreakpointValue, Link, Box} from '@chakra-ui/react'
import { faker } from '@faker-js/faker';

function NewsArticle({ articles }) {

  const columnCount = useBreakpointValue({ base: 1, md: 2 });

  // We are selecting the source of articles based on whichever one has a length graeter than 0, which means has content
  // We fallback to an empty array because on initial render all the sources are empty
  // const articles = [categoryArticles, allArticles].find(arr => arr.length > 0) || [];


  return (
    <SimpleGrid columns={columnCount} spacing={10} justifyItems="center" marginLeft="100px" marginRight="100px">
      {
        articles.map(
         ({ title, author, source, url, urlToImage}, index) => {
          return <NewsArticleItem title={title} author={author} source={source} url={url} urlToImage={urlToImage} index={index}></NewsArticleItem>
          })
        }
    </SimpleGrid>
  );
}

const NewsArticleItem = ({ title, author, source, url, urlToImage, index}) => {
  return (
    <Link href={url} isExternal key={title}>
      <Card w="500px" h="200px">
        <CardBody>
          <Text color="black" fontWeight="semibold" marginBottom={3}>
            {title}
          </Text>
          <Flex align="center">
            <Image src={faker.image.image() + `?random=${index}`} alt="News Image" boxSize="100px" objectFit="cover" borderRadius="10px" />
            <Flex direction="column" ml={4}>
              <Text>Written By {author}</Text>
              <Text>Published From {source}</Text>
              <Box>
                <Image src={urlToImage} />
              </Box>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  );
} 

export default NewsArticle;
