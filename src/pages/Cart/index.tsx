import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View } from 'react-native';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
  TrashView,
} from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';
import FloatingCart from '../../components/FloatingCart';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { increment, decrement, products, trashCart } = useCart();

  const cartTotal = useMemo(() => {
    const total = products.reduce((accumulator, products) => {
      const productsSubtotal = products.price * products.quantity;

      return accumulator + productsSubtotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const total = products.reduce((accumulator, products) => {
      const productsQuantity = products.quantity;

      return accumulator + productsQuantity;
    }, 0);

    return total;
  }, [products]);

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: Product }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitleContainer>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(item.price * item.quantity)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton
                  testID={`increment-${item.id}`}
                  onPress={() => increment(item.id)}
                >
                  <FeatherIcon name="plus" color="#E83F5B" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => decrement(item.id)}
                >
                  <FeatherIcon name="minus" color="#E83F5B" size={16} />
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <View>
        {totalItensInCart > 0 ? (
          <TrashView onPress={() => trashCart()}>
            <FeatherIcon name="trash-2" color="#e83f5b" size={24} />
          </TrashView>
        ) : (
          <View />
        )}
      </View>
      <FloatingCart />
    </Container>
  );
};

export default Cart;
