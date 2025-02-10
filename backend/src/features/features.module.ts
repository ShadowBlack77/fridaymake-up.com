import { Module } from '@nestjs/common';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { OffersModule } from './offers/offers.module';
import { SkinTypesModule } from './skin-types/skin-types.module';

@Module({
  imports: [QuestionnairesModule, OffersModule, SkinTypesModule]
})
export class FeaturesModule {}
