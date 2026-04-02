import useCaddyTalk from "./useCaddyTalk";

const CaddyTalk = () => {
  const { name, description } = useCaddyTalk();
  
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  )
}  

export default CaddyTalk;