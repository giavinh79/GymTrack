import { Button, Container, createStyles, Group, Space, Text, Title } from '@mantine/core';
import { useDispatch } from 'react-redux';

import emptySvg from 'src/assets/images/common/empty.svg';
import { EModal, modalShown } from 'src/slices';

const useNoRoutinePlaceHolderStyles = createStyles((theme) => ({
  header: {
    color: theme.colors.dark[3],
  },
  subHeader: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: theme.colors.dark[2],
  },
  image: {
    width: '100%',
  },
}));

export const NoRoutinePlaceholder = () => {
  const dispatch = useDispatch();

  const { classes } = useNoRoutinePlaceHolderStyles();

  return (
    <Container p='xl' size='sm'>
      <Group position='center'>
        <Title className={classes.header}>NO ROUTINES FOUND</Title>
        <Group position='center' mb='xl'>
          <Text className={classes.subHeader}>Add your first workout routine!</Text>
          <Button
            color='green'
            radius='lg'
            leftIcon={<i className='fas fa-plus' onClick={() => dispatch(modalShown(EModal.ADD_ROUTINE))} />}
            uppercase
          >
            Create
          </Button>
        </Group>
        <Space h='xl' />
        <img src={emptySvg} alt='Graphic showing man carrying empty cardboard box' className={classes.image} />
      </Group>
    </Container>
  );
};
