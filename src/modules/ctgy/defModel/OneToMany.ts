import { secondCtgyModel } from './SecCtgyModel'
import { thirdCtgyModel } from './ThirdCtgyModel'

// create association between two models
// OneToMany: one firstCtgy has many secondCtgys
secondCtgyModel.hasMany(thirdCtgyModel, {
  as: 'thirdctgys',
  foreignKey: 'secondctgyId',
})
// ManyToOne: one secondCtgy belongs to one firstCtgy
thirdCtgyModel.belongsTo(secondCtgyModel, {
  as: 'secondctgy',
  foreignKey: 'secondctgyId',
  targetKey: 'secondctgyId',
})

// start searching
export async function findSecondCtgyByFirstCtgyId(firstctgyId: number) {
  const ret = await secondCtgyModel.findAll({
    // raw: true,
    where: {
      firstctgyId,
    },
    include: [
      {
        model: thirdCtgyModel,
        as: 'thirdctgys',
      },
    ],
  })
  return ret
}
