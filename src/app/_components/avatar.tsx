import { Edit } from "@geist-ui/icons";

type Props = {
  name: string;
};

const Avatar = ({ name }: Props) => {
  return (
    <div className="flex items-center gap-2 my-">
      <Edit className="w-5 h-5 md:w-6 md:h-6" />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
