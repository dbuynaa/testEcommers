// import WholesaleSub from 'components/Products/WholesaleSub';
// type Category = {
//   _id: string;
//   name: string;
//   parentId: string;
// };
// const WholeSaleCat = ({ wholeCategories }) => {
//   const subCategories = (id: any) =>
//     wholeCategories.filter((a: { parentId: any }) => a.parentId === id);

//   return (
//     <div className="product-cats hidden lg:flex">
//       <div className="container flex justify-between">
//         {wholeCategories
//           .filter((a) => !a.parentId)
//           .map(({ _id, name }): any => (
//             <WholesaleSub
//               _id={_id}
//               name={name}
//               subCategories={subCategories(_id)}
//               key={_id}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default WholeSaleCat;
