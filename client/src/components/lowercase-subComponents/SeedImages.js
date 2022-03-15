import React from 'react'

import {Modal, ModalHeader, useDisclosure, ModalContent, ModalBody, ModalCloseButton, Avatar } from '@chakra-ui/react'


const SeedImages = ({ uploadSeeds }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const seedPhotosOptions = [
    ['https://media.gettyimages.com/photos/trans-woman-posing-against-a-black-and-white-wall-looking-at-camera-picture-id1316650000?k=20&m=1316650000&s=612x612&w=0&h=aQb-7sxcYNe8RGSC9ku9Ljg1RI979o7lxVAOsy0nsts=', 'https://media.gettyimages.com/photos/couple-embracing-at-the-beach-looking-to-camera-picture-id1316652038?k=20&m=1316652038&s=612x612&w=0&h=8OOzz46B9yVRRf1sMZyoyMF5Ob62LO7eN0A9FXbGgjQ=', 'https://media.gettyimages.com/photos/three-friends-laughing-and-sharing-a-joke-together-picture-id1316650828?k=20&m=1316650828&s=612x612&w=0&h=ewDdAw7iDFdx7RVvUoQUWWaAyr3dKEm0x3WGepzII-E=', 'https://media.gettyimages.com/photos/trans-women-applying-make-up-while-out-together-picture-id1316651943?k=20&m=1316651943&s=612x612&w=0&h=FKupS-CIsKHM2ELs88_8ExZTxX1MhQ0Wu97WsmomQVo=', 'https://media.gettyimages.com/photos/close-up-portrait-of-a-trans-woman-in-a-puffer-jacket-against-a-sky-picture-id1316650725?k=20&m=1316650725&s=612x612&w=0&h=MdQnYmXv4Bksm5e8QKO5uxU4z215KnSdMxOIyDMyiz4=', 'https://media.gettyimages.com/photos/friends-confidently-walking-along-a-city-street-in-bright-sunlight-picture-id1316650752?k=20&m=1316650752&s=612x612&w=0&h=p2USdKW6ZZpsbEoBd6GOP0h7tFCi-Dmfbs0AA3WL1lI='],
    ['https://media.gettyimages.com/photos/two-teenage-girls-with-long-hair-one-blonde-one-redhead-playing-picture-id948540102?k=20&m=948540102&s=612x612&w=0&h=MXohskwZBpZ-Adv9Vsg5-QTze7Fsta86aC61A3T9ANE=', 'https://media.gettyimages.com/photos/young-teenage-couple-having-fun-on-the-beach-in-love-and-messing-picture-id1008524054?k=20&m=1008524054&s=612x612&w=0&h=-TtuffoCLeZGgpGn4GodHFW8Ja4ahqBdDesfPh0N_44=', 'https://media.gettyimages.com/photos/redhead-youth-walks-along-beach-in-winter-in-puffer-jacket-picture-id905533844?k=20&m=905533844&s=612x612&w=0&h=UxK2Tc7oTfqIntraEqJ6H1qXNsBlx_2Dwqrm2uq32xY=', 'https://media.gettyimages.com/photos/three-friends-sitting-on-railings-on-the-beach-talking-laughing-and-picture-id948539978?k=20&m=948539978&s=612x612&w=0&h=pUoA75GcKPiWEJZEAYRRXmVoRF6rs9VD8IKnJPZyl-o=', 'https://media.gettyimages.com/photos/teenage-boyfriend-and-girlfriend-playing-table-tennis-on-the-beach-in-picture-id948540022?k=20&m=948540022&s=612x612&w=0&h=PjL4yAqBneVU5kLc333-fqdK9U5545UtFUyFc-5Z2Ss=', 'https://media.gettyimages.com/photos/beautiful-redhead-teenager-smiling-and-laughing-at-friends-off-camera-picture-id948540112?k=20&m=948540112&s=612x612&w=0&h=kHlR15SVxJOtvMPNNStTG0jMxBKaeWNsoMrS25gux-s='],
    ['https://media.gettyimages.com/photos/-picture-id162890877?k=20&m=162890877&s=612x612&w=0&h=m4O9TWZMtFvVhOmgaLmj9RKNhdhHzgnHJarTygZ4iNE=', 'https://media.gettyimages.com/photos/-picture-id162890863?k=20&m=162890863&s=612x612&w=0&h=8wSWZR_M_WO1T2DPjVL55CcuHhlBuSR9orJv8K18uzc=', 'https://media.gettyimages.com/photos/-picture-id170869236?k=20&m=170869236&s=612x612&w=0&h=-rKCZaHkPzPGJi-oeHhz3NEkk-R4uFBmXMQQ3emOfP8=', 'https://media.gettyimages.com/photos/-picture-id162890879?k=20&m=162890879&s=612x612&w=0&h=OitYSU8JbPqr0u3WY9z3Ma1PCVDG4GHrxCdPS5ESzUI=', 'https://media.gettyimages.com/photos/-picture-id162890881?k=20&m=162890881&s=612x612&w=0&h=3cDSvBzvSC0cEMKIf6ltHOoz_b5cFb2M8dK6EP4ifac=', 'https://media.gettyimages.com/photos/-picture-id162890860?k=20&m=162890860&s=612x612&w=0&h=y1zBiLGV5NEm9YxvBlX4FsUXpRvThOAz1NKxY0BENyY='],
    ['https://media.gettyimages.com/photos/girl-laughing-with-her-friend-sitting-on-the-sofa-picture-id1170973157?k=20&m=1170973157&s=612x612&w=0&h=dsliPB5gwIp7kJrLV0zIzMqr91WQ6haJYi90f24onMA=', 'https://media.gettyimages.com/photos/confident-smiling-woman-laughing-and-looking-off-camera-shot-against-picture-id1170973024?k=20&m=1170973024&s=612x612&w=0&h=5rSxK4r-idCl_vSue7OKzE7XDesOX-z262Htl21lgA8=', 'https://media.gettyimages.com/photos/three-friends-posing-for-a-selfie-with-big-smiles-looking-at-the-picture-id1170974143?k=20&m=1170974143&s=612x612&w=0&h=iRa26Q8gh1rZsxWRqrRSCUAQZNefEy0fgLJXHTUpGf4=', 'https://media.gettyimages.com/photos/mixed-group-of-girls-standing-looking-at-camera-and-smiling-picture-id1170972838?k=20&m=1170972838&s=612x612&w=0&h=WA2c20l6OvVfD4VcpP5ZNSs8azEdEtHubl7AlTtvEO8=', 'https://media.gettyimages.com/photos/woman-smiling-looking-off-camera-at-friends-drinking-wine-in-the-picture-id1170973349?k=20&m=1170973349&s=612x612&w=0&h=OjJgcoxOd9Hlz53aKTLVDHc_oM7azPut5bnlB_FVhZk=', 'https://media.gettyimages.com/photos/woman-sitting-smiling-at-friend-mid-conversation-while-preparing-food-picture-id1170973256?k=20&m=1170973256&s=612x612&w=0&h=xIovU6dA0yLaw5grQ1VI1vG5IKaWO5NhAEeOA28jeJg='], 
    ['https://media.gettyimages.com/photos/welldressed-man-standing-smiling-with-arms-crossed-against-a-bright-picture-id930436676?k=20&m=930436676&s=612x612&w=0&h=hD-E0WmbJT_uvBrV0byy1e8a90j5fxo3LtCQzneEf0o=', 'https://media.gettyimages.com/photos/woman-showing-family-member-something-on-their-phone-at-home-picture-id930436224?k=20&m=930436224&s=612x612&w=0&h=LNh1hGH0VHbOsPJzs17N_5Obj7eR0G6-f9en8z0f7lM=', 'https://media.gettyimages.com/photos/young-woman-helps-older-man-using-virtual-reality-headset-at-home-picture-id930436968?k=20&m=930436968&s=612x612&w=0&h=HBzp7wuGaYYuUHtjQj2LCnsfkFQE6AsogMnjzNY-GJA=', 'https://media.gettyimages.com/photos/pair-looking-at-projected-images-or-film-while-sitting-on-the-sofa-picture-id930436974?k=20&m=930436974&s=612x612&w=0&h=lEqNMb_CeykcbqDMg8l8HKKRrnkb1CtDEtLlXbd5uoI=', 'https://media.gettyimages.com/photos/man-stands-in-bathroom-looking-at-reflection-in-the-mirror-picture-id930436528?k=20&m=930436528&s=612x612&w=0&h=e_H23DEBnV2cVvqokH8VNYHv-HUGPFXE0UakdDRKIP4=', 'https://media.gettyimages.com/photos/man-sits-in-the-window-bathed-in-sunlight-smiling-and-looking-away-picture-id930436672?k=20&m=930436672&s=612x612&w=0&h=ShDF949J1X9PHHLGaS5zIQv67ShwLZsk_5sGw1VSaDk=']
  ]

  const handleClick = (array) => {
    uploadSeeds(array)
    onClose()
  }
  return (
    <>
      <button className='pink small-btn seed-btn' onClick={onOpen}>Get random photos</button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent width='95%' borderRadius={15} >
          <ModalHeader>Pick your random user profile</ModalHeader>
          <ModalBody>
            {seedPhotosOptions.map((array, i) => <Avatar key={i} id={i} onClick={() => handleClick(array)} margin={15} src={array[0]} size='xl' name='User Profile' />)}
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  )
}

export default SeedImages