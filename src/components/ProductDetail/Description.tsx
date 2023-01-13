const Description = ({ description }: { description: string }) => {
  if (!description) return null;
  return (
    <div
      className="py-4 -description container c-lg"
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  );
};

export default Description;
