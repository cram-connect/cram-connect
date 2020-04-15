import React from 'react';
import { Container, Dropdown, Menu, Image, Icon } from 'semantic-ui-react';

export default class TopMenu extends React.Component {
  render() {
    const navstyle0 = { color: '#b7b7b7', paddingBottom: 15 };
    const navstyle = { color: '#b7b7b7', paddingBottom: 0 };
    return (
        <Menu borderless className="topmenu">
          <Container>
            <Dropdown item text="COLLECTIONS" icon="dropdown" style={navstyle0}>
              <Dropdown.Menu>
                <Dropdown.Item>ESSENTIALS</Dropdown.Item>
                <Dropdown.Item>DIAMONDS</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item><font style={navstyle}>BOUTIQUE</font></Menu.Item>
            <Menu.Item><font style={navstyle}>SALE</font></Menu.Item>

            {/* eslint-disable-next-line max-len */}
            <Image src="https://cdn.shopify.com/s/files/1/0019/1184/9012/t/3/assets/logo.svg?v=3157188196370463836" width="145px" centered/>

            <Menu.Item fitted position="right" style={navstyle}><Icon name="large search" /></Menu.Item>
            <Menu.Item fitted style={navstyle}><Icon name="large user" /></Menu.Item>
            <Menu.Item fitted style={navstyle}><Icon name="large shopping cart" /></Menu.Item>
          </Container>
        </Menu>
    );
  }
}
