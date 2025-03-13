import { Avatar, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import React from "react";
import CountUp from "react-countup";
import "./RecapCard.css";

export default function RecapCard({
  titre,
  value,
  color,
  icon: IconComponent,
}) {
  const [baseColor, opacity] = color.split("/");

  // Définir les classes manuellement
  const textColorClass = `text-${baseColor}`;
  const bgColorClass = `bg-${baseColor}/${opacity || 100}`;

  return (
    <Card className="w-full hoverable-card bg-slate-50" shadow="sm">
      <CardHeader className="justify-between">
        <h1 className="uppercase text-xl font-semibold leading-none text-default-600">
          {titre}
        </h1>
      </CardHeader>
      <Divider />
      <CardBody className="h-[90px] flex justify-center">
        <div className="flex gap-5 px-3">
          <div
            className={`w-16 h-16 ${textColorClass} ${bgColorClass} rounded-full flex items-center justify-center text-4xl font-semibold`}
          >
            <IconComponent className={`h-10 w-10 ${textColorClass}`} />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-4xl font-semibold leading-none text-default-600">
              <CountUp end={value || 0} />
            </h4>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
